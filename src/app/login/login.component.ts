import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup | any;

  constructor(
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.formLogin = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.maxLength(255), Validators.pattern('^[a-zA-Z0-9_-]*$')])],
      password: ['', Validators.compose([Validators.required, Validators.maxLength(255)])]
    });
  }

  submit(): void {
    this.formLogin.markAllAsTouched();
    if (!this.formLogin.valid) {
      return;
    }
    const body = {
      username: this.formLogin.controls.username.value,
      password: this.formLogin.controls.password.value,
    };
    console.log(body);
  }

}
