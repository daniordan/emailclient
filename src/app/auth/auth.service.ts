// CHECKED

// Import this to use dependency injection system
import { Injectable } from '@angular/core';
// Import HttpClient to send a request to the API endpoint and get the response
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

// create an interface to check the return response type and format of the API response
// some developers preffer to have a distinct interfaces file not on top of the class component file
interface UsernameAvailableResponse {
  available: boolean;
}

export interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignupResponse {
  username: string;
}

interface SignedinResponse {
  authenticated: boolean;
  username: string;
}

export interface SigninCredentials {
  username: string;
  password: string;
}

interface SigninResponse {
  username: string;
}

//  Injectable decorator to apply dependency injection needed to create an instance of this class (mark / enable the class to be used in the dependency injection system)
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com';
  // use "$" sign to mark this property as an Observable (known convention name for Observables)
  // This code snippet creates a new BehaviorSubject object named signedin$ with an initial value of null. BehaviorSubject is a type of observable that emits the most recent value to all of its subscribers when they subscribe.
  signedin$ = new BehaviorSubject<boolean | null>(null);
  username = '';

  // use dependency injection to get a reference or an instance of the HttpClient Class
  constructor(private http: HttpClient) {}

  usernameAvailable(username: string) {
    // use HttpClient to send a request to the API endpoint and get the response
    //  use reference of the HttpClient Class (instantiate it using dependency injection system) to send a request to the API endpoint and get the response
    //  .json property to turn the API response into a JS object
    //  we use the generic type <UsernameAvailableResponse> to specify the type of the response (by making use of the interface UsernameAvailableResponse defined above) or use directly <{ available: boolean}> to specify the type of the response
    //       playground: https://getpostman.com to check the response for different POST / GET requests on API
    //       # download Optional desktop request client to mess around with the API Server from https://getpostman.com
    //     check the diagrams/auth/diagrams.drawio/03-docs to see the request details (paths, method, body, descripton, etc)
    return this.http.post<UsernameAvailableResponse>(
      `${this.rootUrl}/auth/username`, // this.rootUrl + '/auth/username`
      {
        username,
      }
    );
  }

  signup(credentials: SignupCredentials) {
    return (
      this.http
        .post<SignupResponse>(`${this.rootUrl}/auth/signup`, credentials)
        // The withCredentials property is used in JavaScript or TypeScript to indicate whether cross-site Access-Control requests should include credentials such as cookies, authorization headers, or TLS client certificates. When set to true, the browser will include the credentials in the request; otherwise, it will not. We do this to have the cookie with token so user is identified as signed in (the cookie will not be discarded anymore (the default http browser behavior) when the browser is refreshed - check this in Inspect - Network - XHR - Headers -> check request headers response for the cookies); in the end, we implemented an Http Interceptor so this is not needed anymore
        .pipe(
          // capture the username to be used in email-create component
          tap(({ username }) => {
            // In the code snippet this.signedin$.next(true);, this.signedin$ refers to an instance of the BehaviorSubject class or a similar type.
            // BehaviorSubject is a type of observable that emits the most recent value to its subscribers and also allows you to set an initial value. It has a method called next() that is used to emit a new value to its subscribers.
            // In this case, this.signedin$.next(true) is emitting the value true to the subscribers of this.signedin$. This could be used to notify other parts of the codebase that the user has successfully signed in.
            // It's important to note that this.signedin$ must be properly initialized before calling next(). Otherwise, an error may occur.
            // This code snippet is using the tap operator from RxJS to perform a side effect. It calls the next method on the signedin$ observable, passing true as the value to emit. This is used to notify other parts of the codebase that the user has successfully signed in. Additionally, it assigns the username value to the username property of the class.
            // tap operator helps to intercept the observable and perform a side effect (do something based upon that value, it's not transforming the value)
            //  if we get error on signup API response request, tap code block will be skipped, which is what we want, so signin$ will stay false in this case
            //  use this to communicate to the other components the status o the user (signedin, signedin, signedout, etc)
            this.signedin$.next(true);
            // capture the username to be used in email-create component
            this.username = username;
          })
        )
    );
  }

  // This code snippet defines a checkAuth function that makes an HTTP GET request to a /auth/signedin endpoint. It expects a response of type SignedinResponse. The function uses the tap operator to perform some actions with the response data, including updating a signedin$ subject and setting the username property. The function returns an observable.
  // Checks if user is signed in
  checkAuth() {
    return this.http
      .get<SignedinResponse>(`${this.rootUrl}/auth/signedin`)
      .pipe(
        // capture the username to be used in email-create component
        tap(({ authenticated, username }) => {
          this.signedin$.next(authenticated);
          // capture the username to be used in email-create component
          this.username = username;
        })
      );
  }

  signout() {
    return this.http.post(`${this.rootUrl}/auth/signout`, {}).pipe(
      tap(() => {
        this.signedin$.next(false);
      })
    );
  }

  signin(credentials: SigninCredentials) {
    return this.http
      .post<SigninResponse>(`${this.rootUrl}/auth/signin`, credentials)
      .pipe(
        // capture the username to be used in email-create component
        tap(({ username }) => {
          this.signedin$.next(true);
          // capture the username to be used in email-create component
          this.username = username;
        })
      );
  }
}
