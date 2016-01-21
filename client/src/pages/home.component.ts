/**
 * Created by jgluhov on 21/01/16.
 */
import {Component, Injector} from 'angular2/core';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import {
    FORM_DIRECTIVES,
    ControlGroup,
    FormBuilder,
    AbstractControl,
    Control
} from 'angular2/common';
import {RouteData, CanActivate} from 'angular2/router';

import {RandomUserService} from '../services/random.user.service';
import {UserService} from '../services/user.service';
import {TokenService} from '../services/token.service';
import {IUser} from '../services/user.interface';


@Component({
    providers: [
        HTTP_PROVIDERS,
        FORM_DIRECTIVES, UserService, RandomUserService, TokenService
    ],
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

@CanActivate((to) => {
    return new Promise((resolve) => {
        let injector = Injector.resolveAndCreate([UserService, HTTP_PROVIDERS, TokenService]);
        let userService = injector.get(UserService);
        userService.user$.subscribe((user:Object) => {
            to.routeData.data['user'] = user;
            resolve(true);
        }, (error:Object) => {
            to.routeData.data['user'] = null;
            console.log(error);
            resolve(true);
        });

        userService.getUser();
    })
})

export class HomeComponent {
    randomUser:Object;
    user:IUser.UserCard;

    loginForm:ControlGroup;
    username:AbstractControl;
    password:AbstractControl;

    constructor(public randomUserService:RandomUserService,
                public userService:UserService,
                public tokenService:TokenService,
                public fb:FormBuilder,
                public routeData:RouteData)
    {
        this.user = routeData.data['user'];

        this.loginForm = fb.group({
            'username': [''],
            'password': ['']
        });

        this.username = this.loginForm.controls['username'];
        this.password = this.loginForm.controls['password'];

        userService.user$.subscribe((user:IUser.UserCard) => {
            this.user = user;
            if (user.token)
                this.tokenService.token = user.token;
        });

        randomUserService.randomUsers$.subscribe(randomUser => {
            this.randomUser = randomUser
        });
    }

    //ngOnInit() {
    //    this.userService.getUser();
    //}

    onSubmit(credentials:IUser.Credentials) {
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