import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {HttpClient} from '@angular/common/http';
import {DetailComponent} from './detail/detail.component';
import {MatDialog} from '@angular/material/dialog';
import {AddComponent} from './add/add.component';
import {environment} from '../../environments/environment';
import {RestConnector} from '../service/rest.connector';
import {EditComponent} from './edit/edit.component';
import {DeleteDialogComponent} from '../delete-dialog/delete-dialog.component';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
    todo: any = [];
    done: any = [];

    data: any;

    constructor(
        private http: HttpClient,
        public dialog: MatDialog,
        private restConnect: RestConnector,
        private cdr: ChangeDetectorRef,
    ) {
    }

    ngOnInit(): void {
        this.getDataTodo();
        this.getDataDone();
    }

    getDataTodo(): void {
        this.restConnect.get(environment.LIST_TODO, true, 'mock').subscribe(res => {
            if (res?.success) {
                this.todo = res.data.sort((a: any, b: any) => a.index - b.index);
                this.cdr.markForCheck();
            }
        });
    }

    getDataDone(): void {
        this.restConnect.get(environment.LIST_DONE, true, 'mock').subscribe(res => {
            if (res?.success) {
                this.done = res.data.sort((a: any, b: any) => a.index - b.index);
                this.cdr.markForCheck();
            }
        });
    }

    drop(event: CdkDragDrop<any[]>, colDrop?: number): void {
        console.log(colDrop, event.container.data, event.previousIndex, event.currentIndex);
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);
        }
    }

    detail(item: object): void {
        const dialogRef = this.dialog.open(DetailComponent, {width: '30%', data: item, disableClose: true});
        dialogRef.afterClosed().subscribe(res => {
            if (res) {
                return;
            }
        });
    }

    addTodo(): void {
        const dialogRef = this.dialog.open(AddComponent, {width: '450px', data: {}, disableClose: true});
        dialogRef.afterClosed().subscribe(res => {
            if (res) {
                this.getDataTodo();
            }
        });
    }

    editTodo(item: object): void {
        const dialogRef = this.dialog.open(EditComponent, {width: '450px', data: {...item}, disableClose: true});
        dialogRef.afterClosed().subscribe(res => {
            if (res) {
                this.getDataTodo();
            }
        });
    }

    deleteTodo(item: any): void {
        const infoDelete = {
            url: environment.DELETE_TODO,
            id: item.id,
            hasAuth: true,
            urlSelect: 'mock'
        };
        const dialogRef = this.dialog.open(DeleteDialogComponent, {width: '450px', data: {...item, infoDelete}, disableClose: true});
        dialogRef.afterClosed().subscribe(res => {
            if (res) {
                this.getDataTodo();
            }
        });
    }

}
