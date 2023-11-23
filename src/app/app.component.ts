// CHECKED

import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  signedin$: BehaviorSubject<boolean | null>;

  // use dependency injection to get a reference or an instance of the AuthService Class
  constructor(private authService: AuthService) {
    this.signedin$ = this.authService.signedin$;
  }

  // The ngOnInit() method is a lifecycle hook in Angular that is called after the component has been initialized. It is commonly used to perform initialization tasks, such as fetching data from a server or initializing variables.
  ngOnInit() {
    // This code snippet is using the authService to check if the user is authenticated. The checkAuth() method returns an observable, and the subscribe() method is used to listen for the response from the observable. In this case, the empty arrow function () => {} is used as a placeholder callback function.
    // This code snippet is written in TypeScript and is part of an Angular component.
    // The ngOnInit() method is a lifecycle hook in Angular that is called when the component is initialized.
    // Inside this method, the checkAuth() method of the authService is called. It returns an Observable. The subscribe() method is used to subscribe to the Observable and execute the empty arrow function () => {} when the Observable emits a value.
    // In summary, this code is checking the authentication status and performing some action when the authentication status changes.
    this.authService.checkAuth().subscribe(() => {});
  }
}
