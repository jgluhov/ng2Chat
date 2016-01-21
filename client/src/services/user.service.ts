/**
 * Created by jgluhov on 20/01/16.
 */
import {Injectable, Inject} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import {TokenService} from './token.service';
import {IUser} from './user.interface';

@Injectable()
export class UserService {
    API_URL = 'http://localhost:3000';
    user$:Observable<Array<IUser.UserCard>>;
    private _userObserver:any;

    constructor(@Inject(Http) public http:Http, @Inject(TokenService) public tokenService:TokenService) {
        // Create Observable stream to output our data
        this.user$ = new Observable((observer:any) =>
            this._userObserver = observer).share();

    }

    getUser() {
        let headers = new Headers();
        if (this.tokenService.token) {
            headers.append('Authorization', `Bearer ${this.tokenService.token}`);
            this.http.get(`${this.API_URL}/me`, {headers: headers})
                .map(res => res.json())
                .subscribe(data => {
                    this._userObserver.next(data);
                }, error => console.log(error.json().message))
        } else {
            this._userObserver.error({message:`auth-token is not provided.`});
        }
    }

    signin(credentials:IUser.Credentials) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post(`${this.API_URL}/login`, JSON.stringify(credentials), {
                headers: headers
            })
            .map(res => res.json())
            .subscribe(data => {
                // Push the new list of users into the Observable stream
                this._userObserver.next(data);
            }, error => console.log(error.json().message))
    }

    signout() {
        this.tokenService.token = ''
    }
}