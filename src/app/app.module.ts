import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApolloModule, Apollo } from 'apollo-angular';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';

import { routing } from './app.routing';

import { BackendProvider } from './helpers';

import { AppComponent } from './app.component';

import { AlertComponent } from './components/alert';
import { AuthGuard } from './auth/auth.guard';
import { JwtInterceptor } from './helpers/interceptors/jwt.interceptor';
import { AlertService, AuthenticationService, UserService } from './services';
import { HomeComponent } from './components/home';
import { LoginComponent } from './components/login';
import { RegisterComponent } from './components/register';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SettingsComponent } from './components/settings/settings.component';
import { MenuComponent } from './components/menu/menu.component';
import { UsersComponent } from './components/lists/users/users.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing,
        ApolloModule,
        HttpLinkModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        HeaderComponent,
        FooterComponent,
        SettingsComponent,
        MenuComponent,
        UsersComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },
        BackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
    constructor(
        apollo: Apollo,
        httpLink: HttpLink
    ) {
        apollo.create({
            link: httpLink.create({uri: 'https://nx81lpmk17.lp.gql.zone/graphql'}),
            cache: new InMemoryCache()
        });
    }
}
