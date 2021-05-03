import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {environment} from '../../../environments/environment';
import {RestConnector} from '../../service/rest.connector';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrManager} from 'ng6-toastr-notifications';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
    dataDetail: any;
    showFormAdd = false;
    showFormEdit = false;

    formAdd: FormGroup | any;
    formEdit: FormGroup | any;

    constructor(
        public dialogRef: MatDialogRef<DetailComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private restConnect: RestConnector,
        private cdr: ChangeDetectorRef,
        private fb: FormBuilder,
        private toast: ToastrManager,
        private translate: TranslateService,
    ) {
    }

    ngOnInit(): void {
        this.getDetail();
        this.initForm();
    }

    initForm(): void {
        this.formAdd = this.fb.group({
            title: ['', Validators.compose([Validators.required, Validators.maxLength(1000)])]
        });
        this.formEdit = this.fb.group({
            title: ['', Validators.compose([Validators.required, Validators.maxLength(1000)])]
        });
    }

    getDetail(): any {
        this.restConnect.get(environment.DETAIL_TODO, true, 'mock', this.data.id).subscribe(res => {
            if (res?.success) {
                this.dataDetail = res.data;
                this.cdr.markForCheck();
            }
        });
    }

    changeStatus(item: any, e: boolean): void {
        const body = {
            ...item,
            status: e
        };
        this.restConnect.put(environment.EDIT_ITEM_DETAIL_TODO, item.id, body, true, 'mock', item.taskId).subscribe(res => {
            if (res?.success) {
                this.cdr.markForCheck();
            }
        });
    }

    addItem(): void {
        this.showFormAdd = true;
    }

    getError(formControlName: string): any {
        if (this.formAdd.controls[formControlName].hasError('required')) {
            return 'COMMON.IS_REQUIRED';
        } else if (this.formAdd.controls[formControlName].hasError('maxlength')) {
            return 'COMMON.MAX_LENGTH';
        }
    }

    add(): void {
        this.formAdd.markAllAsTouched();
        if (this.formAdd.valid) {
            const body = {
                title: this.formAdd.controls.title.value,
            };
            this.restConnect.post(environment.ADD_ITEM_DETAIL_TODO, body, true, 'mock', this.data.id).subscribe((res: any) => {
                if (res?.success) {
                    this.toast.successToastr(this.translate.instant('TODO_LIST.DETAIL.ADD_ITEM_SUCCESS'));
                    this.getDetail();
                    this.showFormAdd = false;
                } else {
                    this.toast.errorToastr(this.translate.instant('TODO_LIST.DETAIL.ADD_ITEM_ERROR'));
                }
            });
        }
    }

    closeFormAdd(): void {
        this.showFormAdd = false;
    }

    editItem(): void {
        this.showFormEdit = true;
    }

    edit(): void {
        this.formEdit.markAllAsTouched();
        if (this.formEdit.valid) {
            const body = {
                title: this.formEdit.controls.title.value,
            };
            this.restConnect.post(environment.EDIT_ITEM_DETAIL_TODO, body, true, 'mock', this.data.id).subscribe((res: any) => {
                if (res?.success) {
                    this.toast.successToastr(this.translate.instant('TODO_LIST.DETAIL.ADD_ITEM_SUCCESS'));
                    this.getDetail();
                    this.showFormEdit = false;
                } else {
                    this.toast.errorToastr(this.translate.instant('TODO_LIST.DETAIL.ADD_ITEM_ERROR'));
                }
            });
        }
    }

    closeFormEdit(): void {
        this.showFormEdit = false;
    }
}
