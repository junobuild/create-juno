import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-backdrop',
  imports: [NgIf],
  templateUrl: './backdrop.component.html',
})
export class BackdropComponent {
  @Input() spinner = false;
}
