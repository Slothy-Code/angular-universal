import {User} from '@logic/models/user';

export interface Message {
    _id: string;
    sender: User;
    text: string;
    created_at: string;
}
