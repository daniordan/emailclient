// CHECKED

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Import needed to use Http Interceptors
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Import needed to use Http Interceptors
import { AuthHttpInterceptor } from './auth/auth-http-interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';

// Bind the Auth Module to the App Module to be able to communicate with it (the Auth Module and App Module are now connected)
// The routing rules we have established inside of the auth routing module get loaded into the app module as well (but this is using eager loading with all the code resources - not lazy loading which we want to avoid resource loading when app starts) => but in this particular app case we want eager loading - user needs immediately all the pages
// the pages will be then displayed on the Host Component (App Component) in the browser
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, AuthModule, HttpClientModule],

  // This code snippet is configuring an HTTP interceptor called AuthHttpInterceptor to be used as a provider in the application. The interceptor will be applied to all HTTP requests and is responsible for adding authentication headers or performing other actions before the request is sent.
  // The multi property in the code snippet indicates that the provider can have multiple instances. In this case, it means that there can be multiple interceptors configured for the HTTP_INTERCEPTORS token. Each interceptor will be executed in the order they are provided.
  // This is the old way to implement dependency injection and we need it to use HTTP_INTERCEPTORS (overrides the dependency injection system)
  // Basically with this provide we tell Angular  that we want tu use the AuthHttpInterceptor class every time the HTTP_INTERCEPTORS are used, for every Http request made.
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
