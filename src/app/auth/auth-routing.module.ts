//  CHECKED

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { SignoutComponent } from './signout/signout.component';

// Routing / navigation rules system - to navigate between app pages
const routes: Routes = [
  { path: 'signout', component: SignoutComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', component: SigninComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
