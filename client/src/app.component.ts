import 'uikit/dist/css/uikit.css'
import {Component, provide} from 'angular2/core';
import {
    ROUTER_DIRECTIVES,
    RouteConfig,
    ROUTER_PROVIDERS,
    LocationStrategy,
    HashLocationStrategy
} from 'angular2/router';
import {HomeComponent} from './pages/home.component';

@Component({
    selector: 'ng2-chat',
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS,
        provide(LocationStrategy, {useClass: HashLocationStrategy})
    ],
    template: `
    <router-outlet></router-outlet>
    `
})

@RouteConfig([
    {path: '/', component: HomeComponent, as: 'Home'}
])

export class AppComponent {
    constructor() {}
}

