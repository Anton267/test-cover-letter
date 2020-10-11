import { Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Letter } from '../shared/interfaces/letter.interface';
import { CoverLetterService } from '../shared/services/cover-letter.service';

@Component({
  selector: 'app-cover-letter',
  templateUrl: './cover-letter.component.html',
  styleUrls: ['./cover-letter.component.sass']
})
export class CoverLetterComponent {

  public letterForm: FormGroup;
  public letters = this.coverLetterService.letters;
  public isModalOpen = false;
  public notUniqueId = false;
  private isEdit = false;
  private saveEditableIndex: number;
  @ViewChild('id', { static: false }) private idElem: ElementRef<HTMLInputElement>;

  constructor(
    public coverLetterService: CoverLetterService,
    private fb: FormBuilder,
  ) {
    this.createForm();
  }

  public newLetter(): void {
    this.createForm();
    this.isModalOpen = true;
  }

  private createForm(): void {
    this.letterForm = this.fb.group({
      id: ['', [Validators.required]],
      profession: ['', [Validators.minLength(3), Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      name: ['', [Validators.minLength(3), Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      about: ['', [Validators.minLength(3), Validators.required]],
      isOpen: [false],
      draft: [false],
    });
  }

  public changeLetterDraft(): void {
    this.draft.value ? this.letterForm.patchValue({ draft: false }) : this.letterForm.patchValue({ draft: true });
    this.draft.value ? this.id.disable() : this.id.enable();
  }

  public saveLetter(): void {
    const letter: Letter = {
      id: this.id.value,
      profession: this.profession.value,
      name: this.name.value,
      about: this.about.value,
      isOpen: this.isOpen.value,
      draft: this.draft.value,
    };
    const unique = this.letters.findIndex((el: Letter) => el.id === letter.id);
    if (unique === -1 || this.saveEditableIndex === unique) {
      this.isEdit ? this.coverLetterService.editLetter(letter) : this.coverLetterService.addLetter(letter);
      this.close();
    } else {
      this.notUniqueId = true;
      this.id.reset();
      this.idElem.nativeElement.focus();
    }
  }

  public editLetter(letter: Letter, i: number, e: MouseEvent): void {
    e.stopPropagation();
    this.isEdit = true;
    this.letterForm.patchValue({ id: letter.id });
    this.letterForm.patchValue({ profession: letter.profession });
    this.letterForm.patchValue({ name: letter.name });
    this.letterForm.patchValue({ about: letter.about });
    this.letterForm.patchValue({ isOpen: letter.isOpen });
    this.letterForm.patchValue({ draft: letter.draft });
    this.isModalOpen = true;
    this.saveEditableIndex = i;
  }

  public removeLetter(letter: Letter): void {
    this.coverLetterService.removeLetter(letter);
  }

  public close(): void {
    this.isModalOpen = false;
    this.letterForm.reset();
    this.isEdit = false;
    this.notUniqueId = false;
    this.saveEditableIndex = null;
  }

  public generateRandomId(): void {
    this.letterForm.patchValue({ id: Math.random().toString(36).substring(2, 15) });
  }

  public get id(): AbstractControl {
    return this.letterForm.get('id');
  }

  public get profession(): AbstractControl {
    return this.letterForm.get('profession');
  }

  public get name(): AbstractControl {
    return this.letterForm.get('name');
  }

  public get about(): AbstractControl {
    return this.letterForm.get('about');
  }

  public get isOpen(): AbstractControl {
    return this.letterForm.get('isOpen');
  }

  public get draft(): AbstractControl {
    return this.letterForm.get('draft');
  }

}
