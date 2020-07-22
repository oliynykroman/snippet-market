import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up.component';
import { SignUpRoutingModule } from './sign-up-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [SignUpComponent],
  imports: [
    CommonModule,
    SignUpRoutingModule,
    ReactiveFormsModule,
    SharedModule
    ],
  exports: [
    SignUpComponent
  ]
})
export class SignUpModule { }
