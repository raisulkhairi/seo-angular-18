import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/todos/todos.component').then(m => m.TodosComponent)
    },
    {
        path: 'detail/:id',
        loadComponent: () => import('./pages/detail-todo/detail-todo.component').then(m => m.DetailTodoComponent)
    }
];
