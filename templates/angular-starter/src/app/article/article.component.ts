import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [],
  templateUrl: './article.component.html'
})
export class ArticleComponent {
  @Input() href!: string;
  @Input() ariaLabel!: string;
}
