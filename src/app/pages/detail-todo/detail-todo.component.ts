import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../entities/todo.entity';

@Component({
  selector: 'app-detail-todo',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './detail-todo.component.html',
  styleUrl: './detail-todo.component.scss',
  styles: [`
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    .back-btn {
      display: inline-block;
      margin-bottom: 20px;
      padding: 10px 20px;
      background: #f0f0f0;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      text-decoration: none;
      color: #333;
    }
    .back-btn:hover {
      background: #e0e0e0;
    }
    .detail-card {
      background: white;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 30px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .detail-id {
      color: #666;
      font-size: 14px;
      margin-bottom: 10px;
    }
    .detail-title {
      font-size: 24px;
      font-weight: 600;
      color: #333;
      margin-bottom: 20px;
    }
    .detail-user {
      color: #999;
      font-size: 16px;
    }
    .loading {
      text-align: center;
      padding: 50px;
      color: #666;
    }
  `]
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
