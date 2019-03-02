import {denormalize, normalize, schema} from 'normalizr';
import {Conversation} from '@logic/models/conversation';
import {User} from '@logic/models/user';
import {Message} from '@logic/models/message';
import {Dictionary} from '@ngrx/entity';
import moment from 'moment';

const user = new schema.Entity('users', {}, {idAttribute: '_id'});

const message = new schema.Entity('messages', {sender: user}, {idAttribute: '_id'});

const conversation = new schema.Entity('conversations', {
    users: [user],
    messages: [message]
}, {idAttribute: '_id'});

export function conversationNormalize(data: Conversation[]) {
    return normalize(data, [conversation]);
}

export function conversationDenormalize(
    entities: {
        users: Dictionary<User>,
        messages: Dictionary<Message>,
        conversations: Dictionary<Conversation>
    }): Conversation[] {
    const input = Object.keys(entities.conversations);
    const conversations = denormalize(input, [conversation], entities) as Conversation[];

    for (const c of conversations) {
        c.messages.sort(messageSorter);
    }

    return conversations;
}

function messageSorter(a: Message, b: Message): number {
    if (moment(a.created_at).isBefore(moment(b.created_at))) return -1;
    if (moment(a.created_at).isAfter(moment(b.created_at))) return 1;

    return 0;
}