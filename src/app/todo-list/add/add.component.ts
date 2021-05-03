import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../environments/environment';
import {RestConnector} from '../../service/rest.connector';
import {ToastrManager} from 'ng6-toastr-notifications';
import {TranslateService} from '@ngx-translate/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
    formAdd: FormGroup | any;

    constructor(
        private dialogRef: MatDialogRef<AddComponent>,
        private fb: FormBuilder,
        private restConnect: RestConnector,
        private toast: ToastrManager,
        private translate: TranslateService,
    ) {
    }

    ngOnInit(): void {
        this.initForm();
    }

    initForm(): void {
        this.formAdd = this.fb.group({
            title: ['', Validators.compose([Validators.required, Validators.maxLength(255)])]
        });
    }

    getError(formControlName: string): any {
        if (this.formAdd.controls[formControlName].hasError('required')) {
            return 'COMMON.IS_REQUIRED';
        } else if (this.formAdd.controls[formControlName].hasError('maxlength')) {
            return 'COMMON.MAX_LENGTH';
        }
    }

    submit(): void {
        this.formAdd.markAllAsTouched();
        if (!this.formAdd.valid) {
            return;
        }
        const body = {
            title: this.formAdd.controls.title.value,
        };
        this.restConnect.post(environment.ADD_TODO, body, true, 'mock').subscribe((res: any) => {
            if (res?.success) {
                this.toast.successToastr(this.translate.instant('TODO_LIST.ADD.SUCCESS'));
                this.dialogRef.close({res});
            } else {
                this.toast.errorToastr(this.translate.instant('TODO_LIST.ADD.ERROR'));
            }
        });
    }

}
