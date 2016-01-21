import 'uikit/dist/css/uikit.css'
import {Component, provide} from 'angular2/core';
import {HTTP_PROVIDERS, RequestOptions} from 'angular2/http';
import {
    FORM_DIRECTIVES,
    ControlGroup,
    FormBuilder,
    AbstractControl,
    Control
} from 'angular2/common';
import {HttpOptions} from './http.options';
import {RandomUserService} from './services/random.user.service';
import {UserService} from './services/user.service';
import {IUser} from './services/user.interface';

@Component({
    selector: 'ng2-chat',
    providers: [
        [HTTP_PROVIDERS, provide(RequestOptions, {useClass: HttpOptions})],
        FORM_DIRECTIVES, UserService, RandomUserService],
    template: `
    <div class="uk-container uk-container-center">
        <div class="uk-block">
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
                    <input type="text"
                        id="password"
                        placeholder="password"
                        [ngFormControl]="password">
                </div>
                <div class="uk-form-row">
                    <button type="submit" class="uk-button">Signin</button>
                </div>
                </fieldset>
            </form>
        </div>
        <button class="uk-button" (click)="getRandomUser()">Get User</button>
        <pre *ngIf="randomUser">{{randomUser | json}}</pre>
    </div>
    `
})

export class AppComponent {
    randomUser: Object;

    loginForm: ControlGroup;

    username: AbstractControl;
    password: AbstractControl;

    constructor(
        public randomUserService: RandomUserService,
        public userService: UserService,
        public fb: FormBuilder
    ) {
        this.loginForm = fb.group({
            'username': [''],
            'password': ['']
        });

        this.username = this.loginForm.controls['username'];
        this.password = this.loginForm.controls['password'];
    }

    onSubmit(credencials: IUser) {
        this.userService.user$.subscribe(user => {
           console.log(user);
        });
        this.userService.login(credencials)
    }

    getRandomUser() {
        this.randomUserService.randomUsers$.subscribe(randomUser => {
            this.randomUser = randomUser
        });
        this.randomUserService.getUser();
    }
}

