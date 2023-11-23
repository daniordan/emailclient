// CHECKED

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

//  Use lazy loading routing rules
// This code snippet defines a constant variable routes that is of type Routes. It is an array that contains an object with three properties: path, canLoad, and loadChildren.
// The path property is set to 'inbox', indicating that this route is for the 'inbox' path.
// The canLoad property is set to [AuthGuard], which means that the AuthGuard must be loaded before this route can be accessed (also the code for the module will not be loaded in the browser if user is not signed in)
// The loadChildren property is a function that dynamically loads the './inbox/inbox.module' module using the import() function. Once the module is loaded, it returns the InboxModule.
const routes: Routes = [
  {
    path: 'inbox',
    // It's an array because we can have multiple different guards on one individual route
    // we might want to check for multiple different conditions before we allow a user to access this route
    canLoad: [AuthGuard],
    //  Use lazy loading routing rules
    loadChildren: () =>
      import('./inbox/inbox.module').then((mod) => mod.InboxModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
