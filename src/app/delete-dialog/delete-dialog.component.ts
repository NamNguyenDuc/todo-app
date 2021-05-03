import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RestConnector} from '../service/rest.connector';

@Component({
    selector: 'app-delete-dialog',
    templateUrl: './delete-dialog.component.html',
    styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

    constructor(
        private dialogRef: MatDialogRef<DeleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private restConnect: RestConnector,
    ) {
    }

    ngOnInit(): void {
    }

    onConfirm(): void {
        const deleted = this.data.infoDelete;
        this.restConnect.delete(deleted.url, deleted.id, deleted?.hasAuth, deleted?.urlSelect).subscribe((resp: any) => {
            if (resp?.success) {
                this.dialogRef.close(true);
            }
        });
    }

    onDismiss(): void {
        // Close the dialog, return false
        this.dialogRef.close(false);
    }

}
