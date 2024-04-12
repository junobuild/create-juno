import {NgIf} from '@angular/common';
import {Component, inject, Input} from '@angular/core';
import {deleteAsset, deleteDoc, Doc} from '@junobuild/core';
import {DocsService} from '../../services/docs.service';
import {Note} from '../../types/note';
import {BackdropComponent} from '../backdrop/backdrop.component';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [BackdropComponent, NgIf],
  templateUrl: './delete.component.html'
})
export class DeleteComponent {
  private readonly docsServices = inject(DocsService);

  @Input() doc!: Doc<Note>;

  progress = false;

  async delItem() {
    this.progress = true;

    try {
      const {
        data: {url}
      } = this.doc;

      if (url !== undefined) {
        const {pathname: fullPath} = new URL(url);

        await deleteAsset({
          collection: 'images',
          fullPath
        });
      }

      await deleteDoc({
        collection: 'notes',
        doc: this.doc
      });

      await this.docsServices.reload();
    } catch (err) {
      console.error(err);
    }

    this.progress = false;
  }
}
