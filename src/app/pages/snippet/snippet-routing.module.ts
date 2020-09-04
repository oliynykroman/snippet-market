import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { AddComponent } from './pages/add/add.component';
import { SnippetComponent } from './snippet.component';
import { EditComponent } from './pages/edit/edit.component';


const routes: Routes = [{
  path: '',
  component: SnippetComponent,
  children: [
    {
      pathMatch: 'add',
      component: AddComponent
    },
    {
      pathMatch: 'list',
      component: ListComponent
    },
    {
      pathMatch: 'edit/:id',
      component: EditComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SnippetRoutingModule { }
