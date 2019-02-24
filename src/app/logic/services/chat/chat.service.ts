import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';
import {Observable} from 'rxjs';
import {Conversation} from '@logic/models/conversation';


@Injectable()
export class ChatService {

    constructor(private httpClient: HttpClient) {
    }

    public getConversations(): Observable<Conversation[]> {
        return this.httpClient.get<Conversation[]>(environment.serverUrl + '/chat/conversations');
    }
}