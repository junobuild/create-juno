import { Component, input } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.component.html',
})
export class HeroComponent {
  href = input.required<string>();
  ariaLabel = input.required<string>();
}
