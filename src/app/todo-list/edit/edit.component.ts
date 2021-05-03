import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RestConnector} from '../../service/rest.connector';
import {ToastrManager} from 'ng6-toastr-notifications';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

    formEdit: FormGroup | any;

    constructor(
        private dialogRef: MatDialogRef<EditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
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
        this.formEdit = this.fb.group({
            title: [this.data.title, Validators.compose([Validators.required, Validators.maxLength(255)])]
        });
    }

    getError(formControlName: string): any {
        if (this.formEdit.controls[formControlName].hasError('required')) {
            return 'COMMON.IS_REQUIRED';
        } else if (this.formEdit.controls[formControlName].hasError('maxlength')) {
            return 'COMMON.MAX_LENGTH';
        }
    }

    submit(): void {
        this.formEdit.markAllAsTouched();
        if (!this.formEdit.valid) {
            return;
        }
        const body = {
            title: this.formEdit.controls.title.value,
        };
        this.restConnect.put(environment.EDIT_TODO, this.data.id, body, true, 'mock').subscribe((res: any) => {
            if (res?.success) {
                this.toast.successToastr(this.translate.instant('TODO_LIST.EDIT.SUCCESS'));
                this.dialogRef.close({res});
            } else {
                this.toast.errorToastr(this.translate.instant('TODO_LIST.EDIT.ERROR'));
            }
        });
    }

}
