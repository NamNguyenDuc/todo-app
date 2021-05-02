import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {HttpClient} from '@angular/common/http';
import {DetailComponent} from './detail/detail.component';
import {MatDialog} from '@angular/material/dialog';

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
  ) {
  }

  ngOnInit(): void {
    this.getDataTodo();
  }

  getDataTodo(): void {
    this.http.get('https://608be4779f42b20017c3d146.mockapi.io/api/v1/tasks').subscribe(res => {
      console.log(res);
      if (res) {
        this.todo = res;
      }
    });
  }

  drop(event: CdkDragDrop<any[]>): void {
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
    const dialogRef = this.dialog.open(DetailComponent, {width: '250px', data: item, disableClose: true});
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        return;
      }
    });
  }

}
