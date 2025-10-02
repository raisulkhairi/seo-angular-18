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
    this.titleService.setTitle(`Todo App - Manage Your Tasks - ${this.data.length} | title`);

    // Standard Meta Tags for SEO

    // Meta description: Page description that will appear as a snippet in Google search results
    // This text helps users understand the page content before clicking
    this.meta.updateTag({name: 'description', content: 'A simple and elegant todo application built with Angular 18. Manage your tasks efficiently.'});

    // Meta keywords: Keywords relevant to the page
    // Although Google doesn't prioritize meta keywords, some other search engines still use them
    this.meta.updateTag({name: 'keywords', content: 'Angular, Todo App, Task Management, SEO, Angular 18'});

    // Open Graph Meta Tags for Social Media Sharing
    // These tags control how the page appears when shared on Facebook, Twitter, LinkedIn, WhatsApp, etc.

    // Open Graph: og:title - Title displayed in social media preview card when link is shared
    this.meta.updateTag({ property: 'og:title', content: `Todo App - Manage Your Tasks - ${this.data.length}`});

    // Open Graph: og:description - Description shown in social media preview card
    this.meta.updateTag({ property: 'og:description', content: 'A simple and elegant todo application built with Angular 18. Manage your tasks efficiently.'});

    // Open Graph: og:type - Type of content (website, article, video, etc.)
    this.meta.updateTag({ property: 'og:type', content: 'website'});

    // Open Graph: og:url - Canonical URL of the page (update with your actual URL)
    this.meta.updateTag({ property: 'og:url', content: 'https://seo-angular-18.vercel.app/todos'});

    // Open Graph: og:site_name - Name of the overall site
    this.meta.updateTag({ property: 'og:site_name', content: 'Todo App'});

    // Open Graph: og:locale - Language and region (en_US, id_ID, etc.)
    this.meta.updateTag({ property: 'og:locale', content: 'en_US'});

    // Open Graph: og:image - Thumbnail/preview image displayed in social media card
    // IMPORTANT: Must be a direct image URL, minimum 1200x630px for best results
    this.meta.updateTag({ property: 'og:image', content: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&h=630&fit=crop&q=80'});

    // Open Graph: og:image:secure_url - HTTPS version of image URL
    this.meta.updateTag({ property: 'og:image:secure_url', content: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&h=630&fit=crop&q=80'});

    // Open Graph: og:image:type - MIME type of the image
    this.meta.updateTag({ property: 'og:image:type', content: 'image/jpeg'});

    // Open Graph: og:image:width - Image width in pixels
    this.meta.updateTag({ property: 'og:image:width', content: '1200'});

    // Open Graph: og:image:height - Image height in pixels
    this.meta.updateTag({ property: 'og:image:height', content: '630'});

    // Open Graph: og:image:alt - Alt text for the image (accessibility & SEO)
    this.meta.updateTag({ property: 'og:image:alt', content: 'Todo App - Task Management Interface'});

    // Twitter Card: twitter:card - Type of Twitter card (summary_large_image recommended for images)
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image'});

    // Twitter Card: twitter:title - Title for Twitter card
    this.meta.updateTag({ name: 'twitter:title', content: 'Todo App - Manage Your Tasks'});

    // Twitter Card: twitter:description - Description for Twitter card
    this.meta.updateTag({ name: 'twitter:description', content: 'A simple and elegant todo application built with Angular 18. Manage your tasks efficiently.'});

    // Twitter Card: twitter:image - Image for Twitter card
    this.meta.updateTag({ name: 'twitter:image', content: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&h=630&fit=crop&q=80'});

    // Twitter Card: twitter:image:alt - Alt text for Twitter image
    this.meta.updateTag({ name: 'twitter:image:alt', content: 'Todo App - Task Management Interface'});

    // Additional SEO Meta Tags

    // robots - Control search engine indexing and crawling behavior
    this.meta.updateTag({ name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'});

    // theme-color - Browser theme color for mobile browsers
    this.meta.updateTag({ name: 'theme-color', content: '#667eea'});
  }
}
