/**
 * Created by jgluhov on 20/01/16.
 */
import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/share'
import {TokenService} from './token.service';

@Injectable()
export class RandomUserService {
    API_URL = 'http://localhost:3000';

    randomUsers$:Observable<Array<Faker.UserCard>>;

    private _usersObserver:any;
    private _dataStore:{
        randomUsers: Array<Faker.UserCard>
    };

    constructor(private http:Http, public tokenService:TokenService) {
        // Create Observable stream to output our data
        this.randomUsers$ = new Observable((observer:any) =>
            this._usersObserver = observer).share();

        this._dataStore = {randomUsers: []};
    }

    getUser() {
        let headers = new Headers();
        if(this.tokenService.token) {
            headers.append('Authorization', `Bearer ${this.tokenService.token}`);
        }

        this.http.get(`${this.API_URL}/random-user`, {
                headers: headers
            })
            .map(res => res.json())
            .subscribe(data => {
                // add user to our users store
                this._dataStore.randomUsers.push(data);

                // Push the new list of users into the Observable stream
                this._usersObserver.next(data);
            })
    }
}