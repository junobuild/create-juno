import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {initJuno} from '@junobuild/core';
import {environment} from '../environments/environment';
import {HomeComponent} from './components/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Juno / Angular Starter';

  async ngOnInit() {
    await initJuno({
      satelliteId: environment.satelliteId,
      container: environment.container
    });
  }
}
