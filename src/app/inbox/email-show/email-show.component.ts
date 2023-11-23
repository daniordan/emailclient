// CHECKED

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Email } from '../email';
// import { EmailService } from '../email.service';
// import { switchMap } from 'rxjs';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css'],
})
export class EmailShowComponent implements OnInit {
  email: Email;

  // This code snippet is a constructor for a class that takes an instance of the ActivatedRoute class as a parameter. It initializes a property email by getting the email value from the snapshot.data object of the route parameter. It then subscribes to the data observable of the route parameter and updates the email property whenever the email value changes.
  // This code snippet is a constructor for a class that takes an instance of the ActivatedRoute class as a parameter. The ActivatedRoute class is part of the Angular framework and is used to access information about the currently activated route.
  // Inside the constructor, there are two operations performed:
  // this.email = route.snapshot.data.email;: This line retrieves the email value from the snapshot.data object of the route parameter and assigns it to the email property of the class. The snapshot property represents a static snapshot of the route information at the moment the constructor is called.
  // this.route.data.subscribe(({ email }) => { this.email = email; });: This line subscribes to the data observable of the route parameter. The data observable emits a new value whenever the route's resolved data changes. In the callback function, it receives an object containing the email value and assigns it to the email property of the class.
  // In summary, this constructor initializes the email property by retrieving the initial email value from the snapshot and then keeps it up to date by subscribing to changes in the email value from the route's resolved data.
  // ActivatedRoute = Provides access to information about a route associated with a component that is loaded in an outlet. Use to traverse the RouterState tree and extract information from nodes, such as route parameters and resolved data. We use snapshot.data['email'] to access email data, in our case we are interested of id.
  // if you check with console.log(route) params property from route (ActivatedRoute) - we notice that params is a BehaviorSubject (An Observable) and being BehaviorSubject means it takes the last value emitted by the Observable - we can use it to extract the last part of the route with snapshot which will be the id (check inbox-routing.module.ts where we use path: ':id', to to capture any string whatsoever after the inbox route and then capture that string in a variable called "id"
  //  two ways to get the id of the email -> Observable which emits values whenever some specific part of the URL changes (BehaviorSubject) or Snapshot from route which is a simple description of what the URL is *right now*
  //  best way to do this is using an Observable
  constructor(
    private route: ActivatedRoute // private emailService: EmailService
  ) {
    //  snapshot is just a snapshot in time, it's the URL at some very specific instant, a url capture "right now" - as it is now; with it we can extract different parameters from the route url (like the string after the last "/" to use it as the id of the email)
    // This code snippet sets the value of this.email using data from the current route snapshot and also subscribes to changes in the route data, updating this.email whenever the data changes.
    //  in "data" we will find the data available for email coming from the EmailResolverService
    // This code snippet is part of the constructor method in the EmailShowComponent class. It initializes the email property of the class by retrieving the initial email value from the snapshot.data object of the route parameter. The snapshot property represents a static snapshot of the route information at the moment the constructor is called.
    // Additionally, it subscribes to the data observable of the route parameter. The data observable emits a new value whenever the route's resolved data changes. In the callback function of the subscribe method, it receives an object containing the email value and assigns it to the email property of the class. This ensures that the email property stays up to date with any changes in the route's resolved data.
    // In summary, this code initializes the email property with the initial email value from the snapshot and keeps it up to date by subscribing to changes in the email value from the route's resolved data.
    this.email = route.snapshot.data['email']; // we can also add this in the constructor to be sure it will work every time
    // Use the Observable subscribe to refresh the data whenever it changes (refatching our email object every time the user navigates between emails)
    // adding this in the constructor ensures us to have immediatly access to the new data using the resolver (any refrash or route change will - meaning re-initializing the class instance - will trigger the resolver and get the new data from the server)
    this.route.data.subscribe(({ email }) => {
      this.email = email;
    });
  }

  ngOnInit() {
    // Use this only for debugging
    // e.g. in case we want to access some property object from route (which is an ActivatedRoute object) we can use subscribe() from RxJs
    // snapshot is an Observable and we need to check it by using RxJs subscribe() - it will give us the id of the email
    // if you check with console.log(route) params property from route (ActivatedRoute) - we notice that params is a BehaviorSubject (An Observable) and being BehaviorSubject means it takes the last value emitted by the Observable - we can use it to extract the last part of the route with snapshot which will be the id (check inbox-routing.module.ts where we use path: ':id', to to capture any string whatsoever after the inbox route and then capture that string in a variable called "id"
    // this.route.params.subscribe((value) => {
    //   console.log(value);
    // });
    // console.log(this.route.snapshot);
    // console.log(this.route.snapshot.params.id);
    // use this for debugging (to check the route object and properties available to use) - you can do the same for every object to check it, use console.log
    // console.log(this.route);
    // use Observable RxJs way with nested subscribes - not very good idea for this case if the user navigates too fast back and forward between email ids
    // this.route.params.subscribe(({ id }) => {
    //   this.emailService.getEmail(id).subscribe((email) => {
    //     console.log(email);
    //   });
    // });
    // in case a new id is emitted from the route - we need to use switchMap() from RxJs - it will switch to the new id and then get the new email (and it will cancel the previous email request)
    // this.route.params
    //   .pipe(
    //     switchMap(({ id }) => {
    //       return this.emailService.getEmail(id);
    //     })
    //   )
    //   .subscribe((email) => {
    // console.log(email);
    //   this.email = email;
    // });
  }
}
