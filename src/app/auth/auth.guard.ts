// CHECKED

import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Resolve,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { take, skipWhile, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
// Implement CanLoad Guard to restrict access to the inbox route unless user is signed in
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  // This code snippet defines a method named canLoad that takes in a route object and an array of segments as parameters. The method returns an Observable<boolean>, a Promise<boolean>, or a boolean.
  // Inside the method, it uses the signedin$ property of the authService object to create an observable. It then performs some operations on this observable using RxJS operators.
  // The skipWhile operator skips emitted values while a specified condition is true. In this case, it skips values until value is not null. The take operator takes only the first emitted value.
  // Finally, the tap operator is used to perform a side effect. It checks if the authenticated value is false, and if so, it navigates to the root URL using the router object.
  // This code snippet is implementing the CanLoad guard interface in Angular to restrict access to a specific route (canLoad is a lifecycle hook for route guards in Angular). The purpose of this guard is to prevent loading of a route unless the user is signed in.
  // The canLoad method takes in a route object and an array of segments as parameters. It returns an Observable<boolean>, a Promise<boolean>, or a boolean, indicating whether the route can be loaded.
  // Inside the method, it uses the signedin$ property of the authService object, which is an Observable<boolean> representing the authentication status of the user.
  // The code uses several RxJS operators to perform operations on the signedin$ observable.
  // The skipWhile operator skips emitted values from the observable while a specified condition is true. In this case, it skips emitted values until the value is not null. This is done to wait for the initial authentication status to be determined.
  // The take operator takes only the first emitted value from the observable. Since we are only interested in the initial authentication status, we only need the first emitted value.
  // Finally, the tap operator is used to perform a side effect. It receives the authenticated value emitted by the signedin$ observable. If authenticated is false, it means the user is not signed in. In this case, the code navigates to the root URL using the router object, preventing the loading of the specified route.
  // In summary, this code snippet ensures that the specified route is only loaded if the user is authenticated. If the user is not authenticated, it redirects them to the root URL.
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return (this.authService.signedin$ as Observable<boolean>).pipe(
      skipWhile((value) => value === null),
      take(1), // we need to take the first emitted value to avoid the Observable to be in a pending state (The Observable is still emitting values until its marked as completed by using subscriber.complete() or subscriber.error() - check the subscribe() methods: next, complete, error); using take we will mark the Observable as completed by taking the first emitted value; we need to do this because we have signedin$ = new BehaviorSubject(false) and we never marked the Observable as completed (BehaviorSubject will be always in pending state - BehaviorSubject is a type of observable that emits the most recent value to all of its subscribers when they subscribe)
      tap((authenticated) => {
        if (!authenticated) {
          this.router.navigateByUrl('/');
        }
      })
    );
  }
}

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };
