/**
 * Created by jgluhov on 21/01/16.
 */
import {Headers, BaseRequestOptions} from 'angular2/http';

export class HttpOptions extends BaseRequestOptions {
    headers: Headers = new Headers({
        'Content-Type': 'application/json'
    })
}