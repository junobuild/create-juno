import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html'
})
export class HeroComponent {
  @Input() href!: string;
  @Input() ariaLabel!: string;
}
