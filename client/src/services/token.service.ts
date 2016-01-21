/**
 * Created by jgluhov on 21/01/16.
 */
import {Injectable} from 'angular2/core';

@Injectable()
export class TokenService {
    store: any;
    key: string;

    constructor() {
        this.store = localStorage;
        this.key = 'auth-token';
    }

    get token() {
        return localStorage.getItem(this.key);
    }

    set token(token: string) {
        token ?
            localStorage.setItem(this.key,token) :
            localStorage.removeItem(this.key);
    }
}



