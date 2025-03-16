import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'tasks', loadChildren: () => import('./todos/list-todos/list-todos.module').then(m => m.ListTodosModule), canActivate: [authGuard] },
  { path: 'login', loadChildren: () => import('./login/login/login.module').then(m => m.LoginModule) },
  { path: '**', component: PageNotFoundComponent }
];
