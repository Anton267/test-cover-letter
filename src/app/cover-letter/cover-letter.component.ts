import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoverLetterService } from '../shared/services/cover-letter.service';

@Component({
  selector: 'app-cover-letter',
  templateUrl: './cover-letter.component.html',
  styleUrls: ['./cover-letter.component.sass']
})
export class CoverLetterComponent implements OnInit {

  letterForm: FormGroup;

  constructor(
    public coverLetterService: CoverLetterService,
    private fb: FormBuilder,
  ) {
    this.letterForm = this.fb.group({
      // id: [''],
      profession: ['', [Validators.minLength(3), Validators.required]],
      name: ['', [Validators.minLength(3), Validators.required]],
      about: ['',  [Validators.minLength(3), Validators.required]],
    });
  }

  ngOnInit(): void {
  }

}
