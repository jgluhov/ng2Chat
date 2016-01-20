import 'uikit/dist/css/uikit.css'
import {Component} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {RandomUserService} from './services/random.user.service';

@Component({
    selector: 'ng2-chat',
    providers: [HTTP_PROVIDERS, RandomUserService],
    template: `
    <button class="uk-button" (click)="getRandomUser()">Get User</button>
    <pre>{{randomUser | json}}</pre>
    `
})

export class AppComponent {
    randomUser: Object;

    constructor(public randomUserService: RandomUserService) {}

    getRandomUser() {
        this.randomUserService.randomUsers$.subscribe(randomUser => {
            this.randomUser = randomUser
        });
        this.randomUserService.getUser();
    }
}

