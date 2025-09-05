import { Component, input } from '@angular/core';

@Component({
  selector: 'app-article',
  imports: [],
  templateUrl: './article.component.html',
})
export class ArticleComponent {
  href = input.required<string>();
  ariaLabel = input.required<string>();
}
