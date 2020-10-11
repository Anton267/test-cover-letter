import { Component, ElementRef, ViewChild } from '@angular/core';
import { Letter } from '../shared/interfaces/letter.interface';
import { CoverLetterService } from '../shared/services/cover-letter.service';

@Component({
  selector: 'app-cover-letter',
  templateUrl: './cover-letter.component.html',
  styleUrls: ['./cover-letter.component.sass']
})
export class CoverLetterComponent {

  public letters: Letter[] = this.coverLetterService.letters;
  public letter: Letter;
  public isModalOpen = false;
  public notUniqueId = false;
  public isEdit = false;
  public saveEditableIndex: number;

  constructor(
    private coverLetterService: CoverLetterService,
  ) { }

  public openModal(): void {
    this.isModalOpen = true;
  }

  public closeModal(): void {
    this.isModalOpen = false;
    this.isEdit = false;
    this.notUniqueId = false;
    this.saveEditableIndex = null;
    this.letter = null;
  }

  public editLetter(letter: Letter, i: number, e: MouseEvent): void {
    e.stopPropagation();
    this.isEdit = true;
    this.isModalOpen = true;
    this.letter = letter;
    this.saveEditableIndex = i;
  }

}
