import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { EmailComponent } from './email/email.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { ForgotPasswordComponent } from './forgot-password.component';


@NgModule({
  declarations: [EmailComponent, NewPasswordComponent, ForgotPasswordComponent],
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule
  ],
  exports: [
    EmailComponent, NewPasswordComponent
  ]
})
export class ForgotPasswordModule { }
