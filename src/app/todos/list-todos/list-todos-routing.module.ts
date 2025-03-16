import { RouterModule, Routes } from '@angular/router';

import { ListTodosComponent } from './list-todos.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '',
    component: ListTodosComponent
  },
  { path: '**', redirectTo: 'task' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListTodosRoutingModule { }
