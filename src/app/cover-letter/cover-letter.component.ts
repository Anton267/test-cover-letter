import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoverLetterService } from '../shared/services/cover-letter.service';

@Component({
  selector: 'app-cover-letter',
  templateUrl: './cover-letter.component.html',
  styleUrls: ['./cover-letter.component.sass']
})
export class CoverLetterComponent implements OnInit {

  letterForm: FormGroup;

  public letters = this.coverLetterService.letters;
  public isModalOpen = false;

  constructor(
    public coverLetterService: CoverLetterService,
    private fb: FormBuilder,
  ) {
    this.letterForm = this.fb.group({
      id: [{ value: this.setrandomID(), disabled: true }],
      profession: ['', [Validators.minLength(3), Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      name: ['', [Validators.minLength(3), Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      about: ['', [Validators.minLength(3), Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  private setrandomID(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  public get id(): AbstractControl { return this.letterForm.get('id'); }

  public get profession(): AbstractControl { return this.letterForm.get('profession'); }

  public get name(): AbstractControl { return this.letterForm.get('name'); }

  public get about(): AbstractControl { return this.letterForm.get('about'); }

}
