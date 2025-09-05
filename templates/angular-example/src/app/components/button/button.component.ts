import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [NgClass],
  templateUrl: './button.component.html',
  host: { style: 'display: contents;' }
})
export class ButtonComponent {
  disabled = input<boolean>(false);
}
