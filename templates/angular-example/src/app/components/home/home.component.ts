import { Component } from '@angular/core';
import { AuthComponent } from '../auth/auth.component';
import { BackgroundComponent } from '../background/background.component';
import { FooterComponent } from '../footer/footer.component';
import { ModalComponent } from '../modal/modal.component';
import { TableComponent } from '../table/table.component';
import { BannerComponent } from '../banner/banner.component';

@Component({
  selector: 'app-home',
  imports: [
    FooterComponent,
    BackgroundComponent,
    TableComponent,
    AuthComponent,
    ModalComponent,
    BannerComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
