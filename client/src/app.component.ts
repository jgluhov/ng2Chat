import 'uikit/dist/css/uikit.css'
import {Component, provide} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {
    FORM_DIRECTIVES,
    ControlGroup,
    FormBuilder,
    AbstractControl,
    Control
} from 'angular2/common';

import {RandomUserService} from './services/random.user.service';
import {UserService} from './services/user.service';
import {TokenService} from './services/token.service';
import {IUser} from './services/user.interface';

@Component({
    selector: 'ng2-chat',
    providers: [
        HTTP_PROVIDERS,
        FORM_DIRECTIVES, UserService, RandomUserService, TokenService],
    template: `
    <div class="uk-container uk-container-center">

        <div class="uk-block" *ngIf="user">
            <h3 class="uk-panel-title">Welcome {{user.credentials.username}}</h3>
        </div>

        <div class="uk-block" *ngIf="!user">
            <div class="uk-panel uk-panel-box uk-panel-box-secondary">
                <form class="uk-form" [ngFormModel]="loginForm" (ngSubmit)="onSubmit(loginForm.value)">
                    <fieldset>
                    <div class="uk-form-row">
                        <label for="username">Username</label>
                        <input type="text"
                            id="username"
                            placeholder="username"
                            [ngFormControl]="username">
                    </div>
                    <div class="uk-form-row">
                        <label for="password">Password</label>
                        <input type="password"
                            id="password"
                            placeholder="password"
                            [ngFormControl]="password">
                    </div>
                    <div class="uk-form-row">
                        <button type="submit" class="uk-button uk-button-success">Signin</button>
                    </div>
                    </fieldset>
                </form>
            </div>
        </div>
        <button class="uk-button" (click)="signout()">Signout</button>
        <button class="uk-button" (click)="getRandomUser()">Get User</button>
        <pre *ngIf="randomUser">{{randomUser | json}}</pre>
    </div>
    `
})


export class AppComponent {
    randomUser: Object;
    user: IUser.UserCard;

    loginForm: ControlGroup;
    username: AbstractControl;
    password: AbstractControl;

    constructor(
        public randomUserService: RandomUserService,
        public userService: UserService,
        public tokenService: TokenService,
        public fb: FormBuilder
    ) {
        this.loginForm = fb.group({
            'username': [''],
            'password': ['']
        });

        this.username = this.loginForm.controls['username'];
        this.password = this.loginForm.controls['password'];

        userService.user$.subscribe((user:IUser.UserCard) => {
            this.user = user;
            if(user.token)
                this.tokenService.token = user.token;
        });

        randomUserService.randomUsers$.subscribe(randomUser => {
            this.randomUser = randomUser
        });
    }

    ngOnInit() {
        this.userService.getUser();
    }

    onSubmit(credentials: IUser.Credentials) {
        this.userService.signin(credentials);
    }

    signout() {
        this.userService.signout();
        this.user = null;
        this.randomUser = null;
    }

    getRandomUser() {
        this.randomUserService.getUser();
    }
}

