import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [],
  imports: [
    LoginComponent,
    CommonModule,
    LoginRoutingModule
  ],
  exports: [LoginComponent]

})
export class LoginModule { }
