// CHECKED

import { Component, OnInit } from '@angular/core';
import { EmailService } from '../email.service';
import { EmailSummary } from '../email.service';

@Component({
  selector: 'app-email-index',
  templateUrl: './email-index.component.html',
  styleUrls: ['./email-index.component.css'],
})
export class EmailIndexComponent implements OnInit {
  emails: EmailSummary[] = [];

  constructor(private emailService: EmailService) {}

  // ngOnInit is a lifecycle hook that is called when the component is initialized - basically, immediately after the constructor is called it will display the emails in the email index component (a refresh of the browser page will call it again for example)
  ngOnInit() {
    // subscribe to the Observable that gets returned, otherwise the request will not actually be executed
    this.emailService.getEmails().subscribe((emails) => {
      this.emails = emails;
    });
  }
}
