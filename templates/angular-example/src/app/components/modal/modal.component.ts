import { NgIf } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { setDoc, uploadFile, User } from '@junobuild/core';
import { nanoid } from 'nanoid';
import { AuthService } from '../../services/auth.service';
import { DocsService } from '../../services/docs.service';
import { BackdropComponent } from '../backdrop/backdrop.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-modal',
  imports: [NgIf, BackdropComponent, ReactiveFormsModule, ButtonComponent],
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  private readonly authService = inject(AuthService);
  private readonly docsServices = inject(DocsService);

  @ViewChild('inputFile') inputFile: ElementRef<HTMLInputElement> | undefined;

  #formBuilder = inject(FormBuilder);

  diaryForm = this.#formBuilder.group({
    entry: '',
  });

  showModal = false;

  file: File | undefined;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  async onSubmit() {
    const user = this.authService.user();

    // It's a demo, irl we would handle errors properly...
    if (user !== null && user !== undefined) {
      try {
        this.diaryForm.disable();

        await this.save(user);

        await this.docsServices.reload();

        this.closeModal();
      } catch (err) {
        console.error(err);
      } finally {
        this.diaryForm.enable();
      }
    }
  }

  private async save(user: User) {
    let url;

    if (this.file !== undefined) {
      const filename = `${user.key}-${this.file.name}`;

      const { downloadUrl } = await uploadFile({
        collection: 'images',
        data: this.file,
        filename,
      });

      url = downloadUrl;
    }

    const key = nanoid();

    await setDoc({
      collection: 'notes',
      doc: {
        key,
        data: {
          text: this.diaryForm.value.entry,
          ...(url !== undefined && { url }),
        },
      },
    });
  }

  onFileChanged($event: Event) {
    const target = $event.target as HTMLInputElement;
    this.file = target.files?.[0];
  }

  openSelectFile() {
    this.inputFile?.nativeElement.click();
  }
}
