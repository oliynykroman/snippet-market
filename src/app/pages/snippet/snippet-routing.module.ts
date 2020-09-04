import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { AddComponent } from './pages/add/add.component';
import { SnippetComponent } from './snippet.component';
import { EditComponent } from './pages/edit/edit.component';

const routes: Routes = [{
  path: '',
  redirectTo: 'list',
  pathMatch: 'full'
},
{
  path: 'add',
  component: AddComponent
},
{
  path: 'list',
  component: ListComponent
},
{
  pathMatch: 'edit',
  component: EditComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SnippetRoutingModule { }
