import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ListTodosModule } from './todos/list-todos/list-todos.module';
import { LoginModule } from './login/login/login.module';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginModule, ListTodosModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'TodoTask';
}
