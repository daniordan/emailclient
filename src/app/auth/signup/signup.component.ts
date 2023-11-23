// CHECKED

import { Component, OnInit } from '@angular/core';
// import FormGroup and FormControl to be able to use ReactiveForms
// import Validators to use built in validators for form fields
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';
import { AuthService } from '../auth.service';
import { SignupCredentials } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  // create a new FormGroup (the overall form)
  authForm = new FormGroup(
    {
      // create the Form Controls (the fields / properties of the overall form)  as objects / properties of the FormGroup
      username: new FormControl(
        '',
        [
          // add Validators for each field in the overall form
          // those are synchronous validators which run instantly when the form is submitted
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-z0-9]+$/),
        ],
        // add validator object to the username field of the form (FormControl) - in the array / list we can add multiple custom validators; Angular will create an instance of UniqueUsername Class when calling the constructor of signup.component.ts (basically when instantiating the signup component class) and add the instance to the array of validators where we will call the validate function of the UniqueUsername Class
        // first array is for synchronous validators
        // we will create a new array for asynchronous validators, as a third argument of the FormControl
        //  the asynchronous validators will run always only after the synchronous validators because the asynchronous validators are expensive to run (it will run async validators only if the sync validators all passed)
        // here we are passing a reference of the UniqueUsername Class to the array of validators (using "this" keyword)
        [this.uniqueUsername.validate]
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
    },
    // add validator object to the overall form (FormGroup) - in the array / list we can add multiple custom validators; Angular will create an instance of MatchPassword Class when calling the constructor of signup.component.ts (basically when instantiating the signup component class) and add the instance to the array of validators where we will call the validate function of the MatchPassword Class
    // here we are passing a reference of the MatchPassword Class to the array of validators (using "this" keyword)
    { validators: [this.matchPassword.validate] }
  );

  constructor(
    //  dependency injection to get a reference or an instance of the MatchPassword Class which is a custom validator to be shared with multiple required fields on the same form, add it as an argument in the class constructor of the SignupComponent
    private matchPassword: MatchPassword,
    //  dependency injection to get a reference or an instance of the UniqueUsername Class which is a custom validator to check if the username is unique, add it as an argument in the class constructor of the SignupComponent
    private uniqueUsername: UniqueUsername,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  // This code snippet is a method called onSubmit() that is triggered when a form is submitted. It first checks if the form is invalid, and if so, it exits the method. If the form is valid, it calls the signup() method of the authService with the form values and subscribes to the response.
  // If the response is successful (next), it navigates to the '/inbox' page. If there is an error (error), it checks if the error object has a status property. If it does not have a status property, it sets the noConnection error in the authForm. Otherwise, it sets the unknownError error in the authForm.
  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }

    // using the value of the authForm (the overall form) basically we get access to all the values of the form fields
    this.authService.signup(<SignupCredentials>this.authForm.value).subscribe({
      // This code snippet is a callback function that is executed when a response is received. It uses the router.navigateByUrl() method to navigate to the '/inbox' route if the response is successful.
      next: (response) => {
        // if success (marked by next method in subscribe), we navigate to the inbox page (or some other route, if the case)
        // manually force the automatic navigation to the inbox route after signing up
        this.router.navigateByUrl('/inbox');
      },
      // This code snippet is an error handler function. If the err object does not have a status property, it sets the noConnection error in the authForm. Otherwise, it sets the unknownError error in the authForm.
      error: (err) => {
        if (!err.status) {
          // status === 0
          this.authForm.setErrors({ noConnection: true });
        } else {
          this.authForm.setErrors({ unknownError: true });
        }
      },
    });
  }

  getFormControl(controlName: string): FormControl {
    return this.authForm.get(controlName) as FormControl;
  }

  //  TO DO

  //  OPTION 1
  //  Create a Base Form Component:

  // 1. Create a new TypeScript file for the base form component, for example, base-form.component.ts.

  // import { FormGroup, FormControl } from '@angular/forms';

  // export abstract class BaseFormComponent {
  //     abstract form: FormGroup;

  //     getFormControl(controlName: string): FormControl {
  //         return this.form.get(controlName) as FormControl;
  //     }
  // }

  // 2. Extend This Base Class in Your Components:
  // Update your sign-in, sign-up, email-form components to extend this base class.

  // import { BaseFormComponent } from './path/to/base-form.component';

  // @Component({
  //   // ... component metadata
  // })
  // export class SignupComponent extends BaseFormComponent {
  //     authForm = new FormGroup({
  //         // ... form controls
  //     });

  //     get form(): FormGroup {
  //         return this.authForm;
  //     }

  //     // ... rest of your component
  // }

  //  OPTION 2

  // Create a Utility Function:

  // Create a utility function in a separate file, for example, form-utils.ts.

  // typescript
  // Copy code
  // import { FormGroup, FormControl } from '@angular/forms';

  // export function getFormControl(form: FormGroup, controlName: string): FormControl {
  //     return form.get(controlName) as FormControl;
  // }
  // Use the Utility Function in Your Components:

  // Import and use this function in your sign-in and sign-up components.

  // typescript
  // Copy code
  // import { getFormControl } from './path/to/form-utils';

  // @Component({
  //   // ... component metadata
  // })
  // export class SignupComponent {
  //     authForm = new FormGroup({
  //         // ... form controls
  //     });

  //     // ... rest of your component

  //     getFormControl(controlName: string): FormControl {
  //         return getFormControl(this.authForm, controlName);
  //     }
  // }
  // Repeat the same for your sign-in component.

  // Both options will help you reuse the getFormControl functionality across different components without duplicating code. Choose the one that best fits your project structure and coding style.
}
