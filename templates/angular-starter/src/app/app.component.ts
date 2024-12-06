import {Component} from '@angular/core';
import {initSatellite} from '@junobuild/core';
import {environment} from '../environments/environment';
import {HomeComponent} from './components/home/home.component';

@Component({
  selector: 'app-root',
  imports: [HomeComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Juno / Angular Starter';

  async ngOnInit() {
    await initSatellite({
      satelliteId: environment.satelliteId,
      container: environment.container,
      workers: {
        auth: './assets/workers/auth.worker.js'
      }
    });
  }
}
