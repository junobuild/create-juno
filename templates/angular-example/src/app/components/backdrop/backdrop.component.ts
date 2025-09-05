import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-backdrop',
  templateUrl: './backdrop.component.html',
})
export class BackdropComponent {
  @Input() spinner = false;
}
