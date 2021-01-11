import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from 'src/app/pipes/filter.pipe';

@NgModule({
  declarations: [
    ListComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ]
})
export class ListModule { }
