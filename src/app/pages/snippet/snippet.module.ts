import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SnippetRoutingModule } from './snippet-routing.module';
import { SnippetComponent } from './snippet.component';
import { AddComponent } from './pages/add/add.component';
import { EditComponent } from './pages/edit/edit.component';
import { ListComponent } from './pages/list/list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';


@NgModule({
  declarations: [SnippetComponent, AddComponent, EditComponent, ListComponent],
  imports: [
    CommonModule,
    SnippetRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CodemirrorModule,
    
  ]
})
export class SnippetModule { }
