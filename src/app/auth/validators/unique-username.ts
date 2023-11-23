// CHECKED

// Import this to use dependency injection system
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  FormControl,
  ValidationErrors,
} from '@angular/forms';
// Imports needed to use RxJs library (Observable - Pipeline - Subscribe Observer)
import { map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

// Import auth service needed to make request to email API Server
import { AuthService } from '../auth.service';

// Use Injectable decorator to apply dependency injection needed to create an instance of this class (mark / enable the class to be used in the dependency injection system)
@Injectable({
  providedIn: 'root',
})
// This is an Async Custom Vaidator Class Based to check in the email API Server if the username is unique
// use AsyncValidator Interface to check the implementation of the Validator Class
export class UniqueUsername implements AsyncValidator {
  // Apply the dependency injection needed to access the auth service to instantiate the AuthService class to return the Observable containing the username availabilityfrom the email API Server
  constructor(private authService: AuthService) {}

  // This code is a validation function that is used to check if a username is unique. It is part of a custom validator called UniqueUsername.

  // Here is a breakdown of the code:

  // 1. The function takes a control parameter of type AbstractControl, which represents the form control being validated.

  // 2. The function extracts the value of the form control using destructuring assignment: const { value } = control.

  // 3. The function then calls a method usernameAvailable() on the authService object, which is an instance of the AuthService class. This method makes an API call to check if the username is available.

  // 4. The result of the API call is returned as an Observable using the pipe() method. This allows for chaining of operators.

  // 5. The first operator used is the map() operator. It checks the response from the API server and looks for the available property. If the available property is true, it means the username is available, and the function returns null.

  // 6. If the API call fails or returns an error, the catchError() operator is used. It checks if the error has a username property (if it has an status error code). If it does, it means that the username is not unique, and the function returns an object { nonUniqueUsername: true }. Otherwise, it returns an object { noConnection: true }.
  // In point 6, the of operator from RxJS is used to create an observable that emits a single value.
  // In this code, of({ nonUniqueUsername: true }) is used when the API call returns an error with a username property. It creates an observable that emits an object { nonUniqueUsername: true }. This allows the code to handle the error case as a valid observable value, which can be consumed by the catchError() operator.
  // Similarly, of({ noConnection: true }) is used when the API call fails for reasons other than a non-unique username. It creates an observable that emits an object { noConnection: true }.
  // By using the of operator, the code ensures that the error cases are handled consistently as observable values, allowing for seamless integration with other operators in the observable chain.

  // In summary, this code validates the uniqueness of a username by making an API call and returning an appropriate validation error message based on the response from the server.

  validate = (
    control: AbstractControl
  ): Observable<ValidationErrors | null> => {
    //   pull out the value from the form using destructuring assignment (in this case the value of tha form field is the username)
    const { value } = control;

    // instantiate the AuthService class (using dependency injection) to return the Observable containing the username availability from the email API Server
    //   use RxJs library (Observable - Pipeline - Subscribe Observer) to check in the email API Server if the username is unique
    return this.authService.usernameAvailable(value).pipe(
      //  use map operator to check the response from the email API Server
      // map operator transforms the value into a new valu (in this case transforms value to null if condition is true) which will be used as validation result
      // the new value will flow to the rest of the pipeline and eventually to subcribers to be used further
      map((value) => {
        //   check the available property in the json response from the email API Server
        //   if the available property is true, means the username is available
        //    this condition can be omited because if the username is not available the request returns an error object (wit hstatus eror code different than 200 ok code so the value will not get the available property); code execution only goes through map operator if the value has attached the available property which means that the API network request was successful
        if (value.available) {
          // returns the value to be used as validation result
          return null;
        } else {
          // returns the value to be used as validation result
          return { nonUniqueUsername: true };
        }
      }),
      // handling errors using catchError operator
      // if the username is not available the request will return an error object with a username property (and will automatically skip the map operator step in the pipeline and go to the catchError operator)
      catchError((err) => {
        if (err.error.username) {
          // returns the value to be used as validation result
          //  we need to return a new Observable in this case (either create it with new Observable or use the "of" RxJS builtin operator)
          return of({ nonUniqueUsername: true });
        } else {
          // returns the value to be used as validation result
          return of({ noConnection: true });
        }
      })
    );
  };
}
