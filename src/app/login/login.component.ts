import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {RestConnector} from '../service/rest.connector';
import {ToastrManager} from 'ng6-toastr-notifications';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../../environments/environment';
import {LocalStorageService} from '../service/local-storage.service';
import {MatDialog} from '@angular/material/dialog';
import {RegisterComponent} from './register/register.component';
import {AuthGuard} from '../service/auth.guard';
import {DataService} from '../service/data.service';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup | any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private restConnect: RestConnector,
    private toast: ToastrManager,
    private translate: TranslateService,
    private localStorageService: LocalStorageService,
    public dialog: MatDialog,
    private authGuard: AuthGuard,
    private dataService: DataService,
  ) {
  }

  ngOnInit(): void {
    this.dataService.currentStatusLogin.subscribe(res => {
      if (res) {
        this.router.navigateByUrl('/todo-list').then();
      }
    });
    this.initForm();
  }

  initForm(): void {
    this.formLogin = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.maxLength(255), Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20)])],
    });
  }

  getError(formControlName: string): any {
    if (this.formLogin.controls[formControlName].hasError('required')) {
      return 'COMMON.IS_REQUIRED';
    } else if (this.formLogin.controls[formControlName].hasError('maxlength')) {
      return 'COMMON.MAX_LENGTH';
    } else if (this.formLogin.controls[formControlName].hasError('minlength')) {
      return 'COMMON.MIN_LENGTH';
    } else if (this.formLogin.controls[formControlName].hasError('email')) {
      return 'COMMON.IS_INVALIDATE';
    }
  }

  submit(): void {
    this.formLogin.markAllAsTouched();
    if (!this.formLogin.valid) {
      return;
    }
    const body = {
      email: this.formLogin.controls.email.value,
      password: this.formLogin.controls.password.value,
    };
    this.restConnect.post(environment.LOG_IN, body, false).subscribe((res: any) => {
      if (res?.success) {
        this.localStorageService.setItem('token', res?.data?.token);
        this.dataService.changeStatusLogin(true);
        this.toast.successToastr(this.translate.instant('LOG_IN.SUCCESS'));
        this.router.navigateByUrl('/todo-list').then();
      } else if (res?.msg) {
        this.toast.errorToastr(res.msg);
      }
      else {
        this.toast.errorToastr(this.translate.instant('LOG_IN.ERROR'));
      }
    });
  }

  register(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {data: {}, disableClose: true});
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.formLogin.controls.email.patchValue(res.email);
        this.formLogin.controls.password.patchValue(res.password);
      }
    });
  }

  forgotPassword(): void {
    const dialogRef = this.dialog.open(ForgotPasswordComponent, {data: {}, disableClose: true});
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        return;
      }
    });
  }

}
