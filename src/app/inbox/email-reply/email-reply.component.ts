// CHECKED

import { Component, OnInit, Input } from '@angular/core';
import { Email } from '../email';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.css'],
})
export class EmailReplyComponent {
  showModal = false;
  // this is an input property used to pass in the email object from email-show (parent component) to email-reply (child component)
  @Input() email: Email = {
    id: '',
    subject: '',
    text: '',
    to: '',
    from: '',
    html: '',
  };

  constructor(private emailService: EmailService) {}

  // This code snippet is an implementation of the ngOnInit method in TypeScript. It replaces newline characters in the email.text property with the string '\n> '. Then it updates the email object by swapping the from and to properties, adding 'RE: ' to the beginning of the subject property, and appending a formatted text at the end.
  // This code snippet is an implementation of the ngOnInit method in an Angular component. This method is called automatically when the component is initialized.
  // In this snippet, the ngOnInit method performs several operations on the email object.
  // First, it replaces newline characters (\n) in the email.text property with the string '\n> '. This is done using the replace method with a regular expression (/\n/gi) and the replacement string '\n> '.
  // The code replaces newline characters (\n) in the email.text property with the string '\n> ' for formatting purposes.
  // The regular expression /\n/gi is used with the replace method to perform a global (g) search for all newline characters (\n) in the email.text property. The i flag makes the search case-insensitive. By using a regular expression with the replace method, all occurrences of newline characters in the email.text property are replaced with the string '\n> '.
  // This replacement is commonly used to format text as a quoted reply in email-like applications or discussion threads. The '\n> ' string is often used to indicate quoted text in a reply, where each line of the quoted text is prefixed with '> ' to visually differentiate it from the new content.
  // Next, it updates the email object by modifying its properties. It swaps the values of the from and to properties, assigns 'RE: ' followed by the original subject value to the subject property, and appends a formatted text at the end of the text property. The formatted text includes a line separator (\n\n\n), a divider (--------), the original sender (this.email.from), the word 'wrote:', and the modified text value with each line prefixed by '> '.
  // Overall, this code snippet modifies the email object by preparing it for a reply, including formatting the text property with quotation marks and updating other relevant properties.
  // we need access to the current email (the one which the user has on screen and wants to reply to) inside the email-reply component; once we got access to that email object, we would then pass it down into email form component; the reason to do that is to capture / get the subject, from and text fields from the email the user is looking at and pre-populate some different inputs inside of our email form; the email-show component already has the email shown on the screen (by using the Resolver in the email-show component) and we can just pass it down to the email-replay and further to the email-form component
  // use ngOnChanges instead of ngOnInit because ngOnChanges is called whenever the component is initialized to fix the bug when clicking on Reply button and th content of the email is not correctly formatted (due to ngOnInit not being called every time the component is initialized)
  ngOnChanges() {
    // use new text variable to replace \n with \n> for each new line in the email (as quoted the original email to which the user will reply to)
    // /\n/gi searcheas for new line across entire string to replace it with '\n> '
    const text = this.email.text.replace(/\n/gi, '\n> ');

    // format the emmail to have the desired reply format
    this.email = {
      // This code snippet is using the spread operator (...) to spread the email property of an object. It allows you to extract the individual values from an array or the properties from an object and use them in another context.
      ...this.email,
      from: this.email.to,
      to: this.email.from,
      subject: `RE: ${this.email.subject}`,
      text: `\n\n\n-------- ${this.email.from} wrote:\n> ${text}`,
    };
  }

  onSubmit(email: Email) {
    this.emailService.sendEmail(email).subscribe(() => {
      this.showModal = false;
    });
  }
}
