import { Component, input } from '@angular/core';

@Component({
  selector: 'app-backdrop',
  templateUrl: './backdrop.component.html',
})
export class BackdropComponent {
  spinner = input(false);
}
