import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ProfileModule { }
