import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrManager} from 'ng6-toastr-notifications';
import {TranslateService} from '@ngx-translate/core';
import {MatDialogRef} from '@angular/material/dialog';
import {RestConnector} from '../../service/rest.connector';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup | any;

  constructor(
    private dialogRef: MatDialogRef<RegisterComponent>,
    private formBuilder: FormBuilder,
    private router: Router,
    private restConnect: RestConnector,
    private toast: ToastrManager,
    private translate: TranslateService,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.formRegister = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
      email: ['', Validators.compose([Validators.required, Validators.maxLength(255), Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20)])],
      password_confirmation: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20)])]
    });
  }

  getError(formControlName: string): any {
    if (this.formRegister.controls[formControlName].hasError('required')) {
      return 'COMMON.IS_REQUIRED';
    } else if (this.formRegister.controls[formControlName].hasError('maxlength')) {
      return 'COMMON.MAX_LENGTH';
    } else if (this.formRegister.controls[formControlName].hasError('minlength')) {
      return 'COMMON.MIN_LENGTH';
    } else if (this.formRegister.controls[formControlName].hasError('notMatch')) {
      return 'COMMON.PASSWORD_NOT_MATCH';
    } else if (this.formRegister.controls[formControlName].hasError('email')) {
      return 'COMMON.IS_INVALIDATE';
    }
  }

  submit(): void {
    this.formRegister.markAllAsTouched();
    const pass = this.formRegister.controls.password.value;
    const confirmPass = this.formRegister.controls.password_confirmation.value;
    if (pass !== confirmPass) {
      return this.formRegister.controls.password_confirmation.setErrors({notMatch: true});
    }
    if (!this.formRegister.valid) {
      return;
    }
    const body = {
      name: this.formRegister.controls.name.value,
      email: this.formRegister.controls.email.value,
      password: pass,
      password_confirmation: confirmPass,
    };
    this.restConnect.post(environment.SIGN_UP, body, false).subscribe((res: any) => {
      if (res?.success) {
        this.toast.successToastr(this.translate.instant('SIGN_UP.SUCCESS'));
        this.dialogRef.close({email: body.email, password: body.password});
      } else if (res?.msg) {
        this.toast.errorToastr(res.msg);
      } else {
        this.toast.errorToastr(this.translate.instant('SIGN_UP.ERROR'));
      }
    });
  }

}
