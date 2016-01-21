/**
 * Created by jgluhov on 20/01/16.
 */
import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import {IUser} from './user.interface';

@Injectable()
export class UserService {
    API_URL = 'http://localhost:3000';

    user$: Observable<Array<IUser>>;

    private _userObserver:any;

    constructor(private http:Http) {
        // Create Observable stream to output our data
        this.user$ = new Observable((observer:any) =>
            this._userObserver = observer).share();

    }

    login(user: IUser) {
        this.http.post(`${this.API_URL}/login`, JSON.stringify(user))
            .map(res => res.json())
            .subscribe(data => {
                // Push the new list of users into the Observable stream
                this._userObserver.next(data);
            }, error => console.log('Could not logged in'))
    }
}