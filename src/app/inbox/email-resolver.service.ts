// CHECKED

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Email } from './email';
import { EmailService } from './email.service';

// This code snippet is a resolver function in Angular. It takes an ActivatedRouteSnapshot as a parameter. It extracts the id from the route parameters and then calls the getEmail method of the emailService.
// If the getEmail method throws an error, it catches the error and navigates to the /inbox/not-found route using the router service. It then returns an empty observable (EMPTY).
// This code snippet is implementing the resolve method of the EmailResolverService class, which is a resolver in Angular. Resolvers are used to fetch data before activating a route.
// The resolve method takes an ActivatedRouteSnapshot object as a parameter, which represents the current state of the route. In this case, it is used to extract the id parameter from the route.
// The method then calls the getEmail method of the emailService object, passing the extracted id as an argument. The getEmail method returns an observable that emits the email associated with the provided id.
// The code uses the pipe operator to apply additional operations on the observable. In this case, it uses the catchError operator to handle any errors that might occur during the execution of the getEmail method. If an error occurs, the code navigates to the /inbox/not-found route using the router service's navigateByUrl method.
// Finally, the method returns an empty observable (EMPTY). This is done to ensure that the resolver completes and the route activation can continue, even if an error occurs during the getEmail method execution.
// In summary, this code snippet fetches an email based on the provided id from the route parameters. If an error occurs during the fetching process, it redirects to the /inbox/not-found route.
// Interface that classes can implement to be a data provider. A data provider class can be used with the router to resolve data during navigation. The interface defines a resolve() method that is invoked right after the ResolveStart router event. The router waits for the data to be resolved before the route is finally activated.
@Injectable({
  providedIn: 'root',
})
export class EmailResolverService implements Resolve<Email> {
  constructor(private emailService: EmailService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot) {
    // destructure the id property from the route params and assign it to the id variable.
    const { id } = route.params;

    return this.emailService.getEmail(id).pipe(
      catchError(() => {
        this.router.navigateByUrl('/inbox/not-found');

        // return an observable already marked as completed (because in this case we don't really care what happens with the Observable / Observer - we don't instantiate any component in case of errors, just navigate to not-found route)
        return EMPTY;
      })
    );
  }
}
