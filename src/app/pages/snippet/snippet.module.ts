import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SnippetRoutingModule } from './snippet-routing.module';
import { SnippetComponent } from './snippet.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [SnippetComponent],
  imports: [
    CommonModule,
    SnippetRoutingModule,
    RouterModule
  ]
})
export class SnippetModule { }
