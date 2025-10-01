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
    this.updateMetaTags();
    this.getTodos();
  }

  getTodos() {
    this.isLoading = true;
    this.todoService.getTodos().subscribe({
      next: (resp: Todo[]) => {
        this.data = resp;
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
    this.titleService.setTitle('Todos | Home');

    // Standard Meta Tags for SEO

    // Meta description: Page description that will appear as a snippet in Google search results
    // This text helps users understand the page content before clicking
    this.meta.addTag({name: 'description', content: 'Welcome to todo | home'});

    // Meta keywords: Keywords relevant to the page
    // Although Google doesn't prioritize meta keywords, some other search engines still use them
    this.meta.addTag({name: 'keywords', content: 'Angular, SEO, Javascript'});

    // Open Graph Meta Tags for Social Media Sharing
    // These tags control how the page appears when shared on Facebook, Twitter, LinkedIn, WhatsApp, etc.

    // og:title: Title displayed in social media preview card when link is shared
    this.meta.addTag({ property: 'og:title', content:'Todo App - Home'});

    // og:description: Description shown in social media preview card
    this.meta.addTag({ property: 'og:description', content: 'Welcome to the home page todos'});

    // og:image: Thumbnail/preview image displayed in social media card when link is shared
    // Open Graph protocol was created by Facebook but now used by almost all social media platforms
    this.meta.addTag({ property:'og:image', content: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fletsenhance.io%2F&psig=AOvVaw2FmLm4hc1yzGKXCRRyHWB-&ust=1759417297268000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCOCV8qmig5ADFQAAAAAdAAAAABAE'});

  }
}
