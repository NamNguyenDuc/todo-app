import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {LoginComponent} from './login.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {TranslateModule} from '@ngx-translate/core';
import {MatSelectModule} from '@angular/material/select';
import { RegisterComponent } from './register/register.component';
import {MatDialogModule} from '@angular/material/dialog';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: LoginComponent,
      }
    ]
  }
];

@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    RegisterComponent
  ],
  exports: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TranslateModule,
    MatSelectModule,
    MatDialogModule,
  ]
})
export class LoginModule {
}
