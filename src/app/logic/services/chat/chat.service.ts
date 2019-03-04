import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';
import {Observable} from 'rxjs';
import {Conversation} from '@logic/models/conversation';
import {EventSourcePolyfill, NativeEventSource} from 'event-source-polyfill';
import {select, Store} from '@ngrx/store';
import {getAuthToken} from '@logic/store';
import {Token} from '@logic/models/token';

@Injectable()
export class ChatService {
    headers = {};

    constructor(private httpClient: HttpClient, private store: Store<{}>) {
        this.store.pipe(select(getAuthToken)).subscribe((token: Token) => {
            this.headers = {Authorization: `Bearer ${token.token}`};
        });
    }

    public getConversations(): Observable<Conversation[]> {
        return this.httpClient.get<Conversation[]>(environment.serverUrl + '/chat/conversations');
    }

    public getConversation(id: string, page = 1): Observable<Conversation> {
        return this.httpClient.get<Conversation>(`${environment.serverUrl}/chat/conversations/${id}?page=${page}`);
    }

    public sendMessage(conversation: Conversation, message: string) {
        return this.httpClient.post<Conversation>(`${environment.serverUrl}/chat/send-message`, {
            conversation: conversation._id,
            text: message
        });
    }

    public listen(): Observable<Conversation> {
        return Observable.create(observer => {
            const eventSource = new EventSourcePolyfill(`${environment.serverUrl}/chat/listen`, {'headers': this.headers});

            eventSource.addEventListener('message', event => {
                observer.next(JSON.parse(event.data));
            });

            eventSource.addEventListener('error', (error) => {
                if (eventSource.readyState === 0) {
                    console.log('reconnect');
                } else {
                    console.log('error');
                    observer.error(JSON.parse(error));
                }
            });
        });
    }
}
