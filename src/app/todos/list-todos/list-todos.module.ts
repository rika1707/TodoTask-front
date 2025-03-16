import { CommonModule } from '@angular/common';
import { ListTodosComponent } from './list-todos.component';
import { ListTodosRoutingModule } from './list-todos-routing.module';
import { NgModule } from '@angular/core';
import { TodoComponent } from '../todo/todo.component';

@NgModule({
  declarations: [],
  imports: [
    TodoComponent,
    CommonModule,
    ListTodosRoutingModule,
    ListTodosComponent
  ],
  exports: [ListTodosComponent]
})
export class ListTodosModule { }
