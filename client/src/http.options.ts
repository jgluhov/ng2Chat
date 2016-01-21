/**
 * Created by jgluhov on 21/01/16.
 */
import {Headers, BaseRequestOptions} from 'angular2/http';
import {TokenService} from './services/token.service';

export class HttpOptions extends BaseRequestOptions {
    headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
    });
}