import {Component} from '@angular/core';
import {AuthComponent} from '../auth/auth.component';
import {BackgroundComponent} from '../background/background.component';
import {FooterComponent} from '../footer/footer.component';
import {ModalComponent} from '../modal/modal.component';
import {TableComponent} from '../table/table.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent, BackgroundComponent, TableComponent, AuthComponent, ModalComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {}
