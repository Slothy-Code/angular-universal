import {normalize, schema} from 'normalizr';
import {Conversation} from '@logic/models/conversation';

const user = new schema.Entity('users', {}, {idAttribute: '_id'});

const message = new schema.Entity('messages', {}, {idAttribute: '_id'});

const conversation = new schema.Entity('conversations', {
    users: [user],
    messages: [message]
}, {idAttribute: '_id'});

export function conversationNormalize(data: Conversation[]) {
    return normalize(data, [conversation]);
}