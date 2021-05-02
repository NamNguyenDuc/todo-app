import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ToastrManager} from 'ng6-toastr-notifications';
import {TranslateService} from '@ngx-translate/core';
import {Observable, timer} from 'rxjs';
import {map, take} from 'rxjs/operators';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

    formForgotPassword: FormGroup | any;
    formEmail: FormGroup | any;
    isSend = false;
    counter$: Observable<number> | undefined;
    count: any;
    timeLimit = 120;

    constructor(
        private dialogRef: MatDialogRef<ForgotPasswordComponent>,
        private formBuilder: FormBuilder,
        private router: Router,
        private toast: ToastrManager,
        private translate: TranslateService,
    ) {
    }

    ngOnInit(): void {
        this.initForm();
    }

    initForm(): void {
        this.formEmail = this.formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.maxLength(255), Validators.email])],
        });

        this.formForgotPassword = this.formBuilder.group({
            code: ['', Validators.compose([Validators.required])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20)])],
            password_confirmation: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20)])]
        });
    }

    send(): void {
        this.formEmail.markAllAsTouched();
        if (!this.formEmail.valid) {
            return;
        }
        this.isSend = true;
        this.count = this.timeLimit;
        this.counter$ = timer(0, 1000).pipe(
            take(this.count),
            map(() => --this.count)
        );
    }

    reSend(): void {
        this.count = this.timeLimit;
        this.counter$ = timer(0, 1000).pipe(
            take(this.count),
            map(() => --this.count)
        );
    }

    submit(): void {
        this.formForgotPassword.markAllAsTouched();
        const newPass = this.formForgotPassword.controls.password.value;
        const confirmPass = this.formForgotPassword.controls.password_confirmation.value;
        if (newPass !== confirmPass) {
            return this.formForgotPassword.controls.password_confirmation.setErrors({notMatch: true});
        }
        if (!this.formForgotPassword.valid) {
            return;
        }
        const body = {
            code: this.formForgotPassword.controls.code.value,
            password: newPass,
            password_confirmation: confirmPass,
        };
        console.log(body);
        this.toast.successToastr(this.translate.instant('FORGOT_PASSWORD.SUCCESS'));
    }

    getErrorFormEmail(formControlName: string): any {
        if (this.formEmail.controls[formControlName].hasError('required')) {
            return 'COMMON.IS_REQUIRED';
        } else if (this.formEmail.controls[formControlName].hasError('maxlength')) {
            return 'COMMON.MAX_LENGTH';
        } else if (this.formEmail.controls[formControlName].hasError('email')) {
            return 'COMMON.IS_INVALIDATE';
        }
    }

    getError(formControlName: string): any {
        if (this.formForgotPassword.controls[formControlName].hasError('required')) {
            return 'COMMON.IS_REQUIRED';
        } else if (this.formForgotPassword.controls[formControlName].hasError('maxlength')) {
            return 'COMMON.MAX_LENGTH';
        } else if (this.formForgotPassword.controls[formControlName].hasError('minlength')) {
            return 'COMMON.MIN_LENGTH';
        } else if (this.formForgotPassword.controls[formControlName].hasError('notMatch')) {
            return 'COMMON.PASSWORD_NOT_MATCH';
        }
    }

}
