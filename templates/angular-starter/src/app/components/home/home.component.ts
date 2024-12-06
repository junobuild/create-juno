import {Component} from '@angular/core';
import {ArticleComponent} from '../article/article.component';
import {BackgroundComponent} from '../background/background.component';
import {FooterComponent} from '../footer/footer.component';
import {HeroComponent} from '../hero/hero.component';

@Component({
  selector: 'app-home',
  imports: [HeroComponent, ArticleComponent, FooterComponent, BackgroundComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {}
