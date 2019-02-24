import {User} from '@logic/models/user';
import {Message} from '@logic/models/message';

export interface Conversation {
    _id: string;
    users: User[];
    messages: Message[];
}