import { Component, inject } from '@angular/core';
import { Todo } from '../../entities/todo.entity';
import { TodoService } from '../../services/todo.service';
import { RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent {
  data: Todo[] = [];
  isLoading: boolean = false;

  todoService = inject(TodoService);
  meta = inject(Meta);
  titleService = inject(Title)

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos() {
    this.isLoading = true;
    this.todoService.getTodos().subscribe({
      next: (resp: Todo[]) => {
        this.data = resp;
        this.updateMetaTags();
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    })
  }

  /**
   * Update meta tags for SEO (Search Engine Optimization)
   * Meta tags help search engines understand page content and improve visibility in search results
   */
  updateMetaTags() {
    // Set page title that will appear in browser tab and search results
    this.titleService.setTitle('Todo App - Manage Your Tasks');

    // Standard Meta Tags for SEO

    // Meta description: Page description that will appear as a snippet in Google search results
    // This text helps users understand the page content before clicking
    this.meta.updateTag({name: 'description', content: 'A simple and elegant todo application built with Angular 18. Manage your tasks efficiently.'});

    // Meta keywords: Keywords relevant to the page
    // Although Google doesn't prioritize meta keywords, some other search engines still use them
    this.meta.updateTag({name: 'keywords', content: 'Angular, Todo App, Task Management, SEO, Angular 18'});

    // Open Graph Meta Tags for Social Media Sharing
    // These tags control how the page appears when shared on Facebook, Twitter, LinkedIn, WhatsApp, etc.

    // og:title: Title displayed in social media preview card when link is shared
    this.meta.updateTag({ property: 'og:title', content: `Todos | Total of ${this.data.length}`});

    // og:description: Description shown in social media preview card
    this.meta.updateTag({ property: 'og:description', content: 'A simple and elegant todo application built with Angular 18. Manage your tasks efficiently.'});

    // og:image: Thumbnail/preview image displayed in social media card when link is shared
    // Open Graph protocol was created by Facebook but now used by almost all social media platforms
    // IMPORTANT: Must be a direct image URL (not a redirect) and accessible publicly
    // Recommended: Use absolute URL with https://, minimum 1200x630px for best results
    this.meta.updateTag({ property:'og:image', content: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&h=630&fit=crop&q=80'});
    this.meta.updateTag({ property:'og:image:width', content: '1200'});
    this.meta.updateTag({ property:'og:image:height', content: '630'});
    this.meta.updateTag({ property:'og:type', content: 'website'});
  }
}
