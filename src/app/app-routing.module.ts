import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './service/auth.guard';

const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'todo-list',
        canActivate: [AuthGuard],
        loadChildren: () => import('./todo-list/todo-list.module').then(m => m.TodoListModule)
    },
    {path: '', redirectTo: 'todo-list', pathMatch: 'full'},
    {path: '**', redirectTo: 'todo-list', pathMatch: 'full'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
