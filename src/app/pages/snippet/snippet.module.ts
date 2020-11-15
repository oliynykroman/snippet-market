import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SnippetRoutingModule } from './snippet-routing.module';
import { SnippetComponent } from './snippet.component';
import { AddComponent } from './pages/add/add.component';
import { EditComponent } from './pages/edit/edit.component';
import { ListComponent } from './pages/list/list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEditComponent } from './shared/add-edit/add-edit.component';
import { HighlightModule } from 'ngx-highlightjs';
import { DetailsComponent } from './pages/details/details.component';

@NgModule({
  declarations: [
    SnippetComponent,
    AddComponent,
    EditComponent,
    ListComponent,
    AddEditComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    SnippetRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CodemirrorModule,
    HighlightModule
  ],
  providers: [
    NgbModal,
    NgbActiveModal
  ]
})
export class SnippetModule { }
