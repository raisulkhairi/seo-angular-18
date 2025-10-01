import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../entities/todo.entity';

@Component({
  selector: 'app-detail-todo',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './detail-todo.component.html',
  styleUrl: './detail-todo.component.scss'
})
export class DetailTodoComponent implements OnInit {
  todo: Todo | null = null;
  todoId: number = 0;

  route = inject(ActivatedRoute);
  todoService = inject(TodoService);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.todoId = +params['id'];
      this.getTodoDetail();
    });
  }

  getTodoDetail() {
    this.todoService.getTodo(this.todoId).subscribe({
      next: (resp: Todo) => {
        this.todo = resp;
      }
    });
  }
}
