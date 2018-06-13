import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { routing }        from './app.routing';

import { BackendProvider } from './helpers';

import { AppComponent }  from './app.component';

import { AlertComponent } from './components/alert';
import { AuthGuard } from './auth/auth.guard';
import { JwtInterceptor } from './helpers/interceptors/jwt.interceptor';
import { AlertService, AuthenticationService, UserService } from './services';
import { HomeComponent } from './components/home';
import { LoginComponent } from './components/login';
import { RegisterComponent } from './components/register';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent
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

export class AppModule { }