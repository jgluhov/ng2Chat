import 'uikit/dist/css/uikit.css'
import {Component} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {
    FORM_DIRECTIVES,
    ControlGroup,
    FormBuilder,
    AbstractControl,
    Control
} from 'angular2/common';
import {RandomUserService} from './services/random.user.service';

@Component({
    selector: 'ng2-chat',
    providers: [HTTP_PROVIDERS, FORM_DIRECTIVES, RandomUserService],
    template: `
    <div class="uk-container uk-container-center">
        <div class="uk-block">
            <form class="uk-form">
                <fieldset>
                <div class="uk-form-row">
                    <label for="username">Username</label>
                    <input type="text" id="username" placeholder="username">
                </div>
                <div class="uk-form-row">
                    <label for="password">Password</label>
                    <input type="text" id="password" placeholder="password">
                </div>
                <div class="uk-form-row">
                    <button type="submit" class="uk-button">Signin</button>
                </div>
                </fieldset>
            </form>
        </div>
        <button class="uk-button" (click)="getRandomUser()">Get User</button>
        <pre>{{randomUser | json}}</pre>
    </div>
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

