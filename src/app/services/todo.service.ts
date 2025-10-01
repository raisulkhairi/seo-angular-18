import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Todo } from "../entities/todo.entity";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class TodoService {
    http = inject(HttpClient);
    url = 'https://jsonplaceholder.typicode.com/todos';

    getTodos(): Observable<Todo[]> {
        return this.http.get<Todo[]>(this.url);        
    }

    getTodo(id: number): Observable<Todo> {
        return this.http.get<Todo>(`${this.url}/${id}`)
    }
}