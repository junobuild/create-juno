import { NgIf } from '@angular/common';
import { Component, isDevMode } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-banner',
  imports: [NgIf],
  templateUrl: './banner.component.html',
})
export class BannerComponent {
  #dev = isDevMode();

  #satelliteId = environment.satelliteId;
  #satelliteMissing =
    !this.#satelliteId || this.#satelliteId === '<DEV_SATELLITE_ID>';

  showBanner = this.#dev && this.#satelliteMissing;
}
