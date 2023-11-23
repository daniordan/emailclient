//  CHECKED

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { EmailService } from '../email.service';
import { Email } from '../email';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.css'],
})
export class EmailCreateComponent implements OnInit {
  showModal = false;
  email: Email;

  constructor(
    private authService: AuthService,
    private emailService: EmailService
  ) {
    this.email = {
      id: '',
      to: '',
      subject: '',
      html: '',
      text: '',
      // capture the username from the auth service from the request response
      from: `${authService.username}@angular-email.com`,
    };
  }

  ngOnInit() {}

  // add an event handler for emailSubmit event from the email form; any time the event occurs the onSubmit method will be called which will make the post request to sent the email to the email API server
  // the method will be called with the emitted value which in our case is the email that we are trying to submit
  onSubmit(email: Email) {
    //  send the email off via the email service
    this.emailService.sendEmail(email).subscribe(() => {
      // close the modal after the email has been sent
      this.showModal = false;
    });
  }
}
