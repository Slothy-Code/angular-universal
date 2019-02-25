import {denormalize, normalize, schema} from 'normalizr';
import {Conversation} from '@logic/models/conversation';
import {User} from '@logic/models/user';
import {Message} from '@logic/models/message';
import {Dictionary} from '@ngrx/entity';

const user = new schema.Entity('users', {}, {idAttribute: '_id'});

const message = new schema.Entity('messages', {sender: user}, {idAttribute: '_id'});

const conversation = new schema.Entity('conversations', {
    users: [user],
    messages: [message]
}, {idAttribute: '_id'});

export function conversationNormalize(data: Conversation[]) {
    return normalize(data, [conversation]);
}

export function conversationDenormalize(entities: {
    users: Dictionary<User>,
    messages: Dictionary<Message>,
    conversations: Dictionary<Conversation>
}) {
    const input = Object.keys(entities.conversations);
    return denormalize(input, [conversation], entities);
}
