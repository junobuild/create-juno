import {NgClass} from '@angular/common';
import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html'
})
export class ButtonComponent {
  @Input() disabled!: boolean;
}
