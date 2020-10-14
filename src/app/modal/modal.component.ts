import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Letter } from '../shared/interfaces/letter.interface';
import { CoverLetterService } from '../shared/services/cover-letter.service';

function uniqueId(control: AbstractControl): Observable<{ [key: string]: any }> | null {
  const id = control.value;
  return of(id).pipe(
    delay(500),
    map(val => {
      const unique = this.letters.findIndex((el: Letter) => el.id === val);
      if (unique === -1 || this.saveEditableIndex === unique || val === null) {
        return null;
      } else {
        return { uniqueId: val };
      }
    })
  );
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent implements OnInit {

  @Input() private letters: Letter[];
  @Input() private isEdit: boolean;
  @Input() private saveEditableIndex: number;
  @Input() private letter: Letter;
  @Output() public closeEvent: EventEmitter<any> = new EventEmitter();
  public letterForm: FormGroup;

  constructor(
    private coverLetterService: CoverLetterService,
    private fb: FormBuilder,
  ) {
    this.letterForm = this.fb.group({
      id: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)], uniqueId.bind(this)],
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
      id: this.id.value ? this.id.value.toString().trim() : null,
      profession: this.profession.value.toString().trim(),
      name: this.name.value.toString().trim(),
      about: this.about.value.toString().trim(),
      isOpen: this.isOpen.value,
      draft: this.draft.value,
    };
    this.letterForm.setValue(letter);
    if (this.letterForm.invalid) {
      return;
    }
    this.isEdit ? this.coverLetterService.editLetter(letter) : this.coverLetterService.addLetter(letter);
    this.close();
  }

  public close(): void {
    this.closeEvent.emit();
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

  ngOnInit(): void {
    if (!this.letter) {
      return;
    }
    this.letterForm.patchValue({ id: this.letter.id });
    this.letterForm.patchValue({ profession: this.letter.profession });
    this.letterForm.patchValue({ name: this.letter.name });
    this.letterForm.patchValue({ about: this.letter.about });
    this.letterForm.patchValue({ isOpen: this.letter.isOpen });
    this.letterForm.patchValue({ draft: this.letter.draft });
    if (this.draft.value) {
      this.id.disable();
    }
  }

}
