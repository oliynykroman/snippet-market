import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SnippetRoutingModule } from './snippet-routing.module';
import { SnippetComponent } from './snippet.component';
import { AddComponent } from './pages/add/add.component';
import { EditComponent } from './pages/edit/edit.component';
import { ListComponent } from './pages/list/list.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SnippetComponent, AddComponent, EditComponent, ListComponent],
  imports: [
    CommonModule,
    SnippetRoutingModule,
    ReactiveFormsModule
  ]
})
export class SnippetModule { }
