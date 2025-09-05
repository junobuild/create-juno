import { Component, Signal, inject } from '@angular/core';
import { Doc } from '@junobuild/core';
import { DocsService } from '../../services/docs.service';
import { Note } from '../../types/note';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-table',
  imports: [DeleteComponent],
  templateUrl: './table.component.html',
})
export class TableComponent {
  private readonly docsService = inject(DocsService);

  readonly docs: Signal<Doc<Note>[]> = this.docsService.docs;
}
