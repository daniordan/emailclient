// CHECKED

// Import Injectable to apply dependency injection needed to create an instance of this class (use dependency injection system)
import { Injectable } from '@angular/core';
import {
  Validator,
  FormGroup,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

// Use Injectable decorator to apply dependency injection needed to create an instance of this class (mark / enable the class to be used in the dependency injection system)
@Injectable({ providedIn: 'root' })
// Create Class-Based Custom Syncronous (Sync) Validator to match the password with password confirmation
// Implement the Validator Interface (interface = a blue print of the class) to check if MatxhPassword Class is implemented correctly (using "implements Validator" we can be sure that Typescript will notify us if the implementation is wrong)
export class MatchPassword implements Validator {
  //   Use formGroup as argument/parameter because we need to apply the validator to the entire FormGroup ( password & password confirmation) not just a field which means using FormControl only) - or if you are not sure what to use just use control: AbstractControl (which gets either FormGroup or FormControl)
  validate(formGroup: AbstractControl) {
    //   get the password and password confirmation fields values from the form by extracting them from the formGroup and placing then in a const variable using destructuring assignment (see above for more info on const)

    const { password, passwordConfirmation } = formGroup.value;

    if (password === passwordConfirmation) {
      // returns the value to be used as validation result
      return null;
    } else {
      //   in case passwords don't match we return the object {passwordsDontMatch: true} which can be accessed using authForm.errors (passwordsDontMatch property / object will be added to the authForm.errors object)
      // returns the value to be used as validation result
      return { passwordsDontMatch: true };
    }
  }

  // ALTERNATIVE:
  // validate(control: AbstractControl): ValidationErrors | null {
  //   const password = control.get('password');
  //   const confirmPassword = control.get('passwordConfirmation');

  //   if (
  //     password &&
  //     confirmPassword &&
  //     password.value !== confirmPassword.value
  //   ) {
  //     return { passwordsDontMatch: true };
  //   }

  //   return null;
  // }
}
