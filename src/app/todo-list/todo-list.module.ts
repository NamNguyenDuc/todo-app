import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {DetailComponent} from './detail/detail.component';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule, Routes} from '@angular/router';
import {TodoListComponent} from './todo-list.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: TodoListComponent,
      }
    ]
  }
];

@NgModule({
  declarations: [
    TodoListComponent,
    DetailComponent
  ],
  exports: [
    TodoListComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    TranslateModule,
    RouterModule.forChild(routes),
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class TodoListModule {
}
