// CHECKED

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Email } from '../email';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css'],
})
export class EmailFormComponent implements OnInit {
  // emailForm: FormGroup = new FormGroup({});
  emailForm!: FormGroup;
  @Input() email: Email = {
    id: '',
    subject: '',
    text: '',
    to: '',
    from: '',
    html: '',
  };
  @Output() emailSubmit = new EventEmitter();

  constructor() {}

  // The ngOnInit() method is a lifecycle hook in Angular that is called after the component has been initialized. It is commonly used to perform initialization tasks such as fetching data from a server or setting up subscriptions.
  // Anytime we access an input property or something that's going to be passed down from the parent component, we don't have access to a value on that thing inside the constructor; instead we only get access to the email that was passed down inside of ngOnInit() lifecycle hook.
  ngOnInit() {
    // destructure objects (pull off) from email object passed in from the parent component and save them in local variables
    // to use them to initialize the form (add default values)
    const { subject, from, to, text } = this.email;

    this.emailForm = new FormGroup({
      to: new FormControl(to, [Validators.required, Validators.email]),
      // replace form with the object "value: from" to access the value of the form field to lock the value and disable it so that the user can't edit this form field
      from: new FormControl({ value: from, disabled: true }),
      subject: new FormControl(subject, [Validators.required]),
      text: new FormControl(text, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.emailForm.invalid) {
      return;
    }

    // At form submission emit all the values out of our form or at least the ones that are not disabled to the parent component, so we use this.emailForm.value
    //  use the event emitter from the parent component to send the email
    //  the parent component (email-create) will listen for that event, receive the email and pass it off to the email service
    this.emailSubmit.emit(this.emailForm.value);
    // For debugging
    // console.log(this.emailForm.value);
    // if you want to sent also the locked field on form submission (check the above: from: new FormControl({ value: from, disabled: true }) ) you need to use getRawValue() instead of just "value", like this:
    // console.log(this.emailForm.getRawValue());
  }

    getFormControl(controlName: string): FormControl {
    return this.emailForm.get(controlName) as FormControl;
  }
}
