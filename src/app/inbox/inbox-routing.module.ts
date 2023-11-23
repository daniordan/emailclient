//  CHECKED

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { EmailShowComponent } from './email-show/email-show.component';
import { EmailResolverService } from './email-resolver.service';
import { NotFoundComponent } from './not-found/not-found.component';

// set up lazy loading
const routes: Routes = [
  // set routing rules for childrens of inbox (child routing)
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'not-found',
        component: NotFoundComponent,
      },
      {
        // adding ":" (as sort of a wildcard) to capture any string whatsoever after the inbox route and then capture that string in a variable called "id"
        path: ':id',
        component: EmailShowComponent,
        // This code snippet (the resolve key) is configuring the resolve property of an object. It specifies that when resolving the "email" key, the EmailResolverService should be used. Basically, when using email property on the html email show template, first use the resolver to fatch the date (to not have the undefined error on email) and then use that data to display the email.
        // first, run the EmailResolverService to get some data and then display it in the email show component template
        //  we can add multiple resolvers wired up to a component because one of your components might require multiple different pieces of information and for this we can provide our resolvers inside of an object
        resolve: {
          email: EmailResolverService,
        },
      },
      { path: '', component: PlaceholderComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InboxRoutingModule {}
