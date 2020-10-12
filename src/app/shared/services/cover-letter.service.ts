import { Injectable } from '@angular/core';
import { Letter } from '../interfaces/letter.interface';

@Injectable({
  providedIn: 'root'
})
export class CoverLetterService {

  public letters: Letter[] = [];

  public addLetter(letter: Letter): void {
    this.letters.push(letter);
  }

  public removeLetter(letter: Letter): void {
    const index = this.findLetterIndex(letter);
    this.letters.splice(index, 1);
  }

  public editLetter(letter: Letter): void {
    const index = this.findLetterIndex(letter);
    this.letters.splice(index, 1, letter);
  }

  private findLetterIndex(letter: Letter): number {
    return this.letters.findIndex((el: Letter) => el.id === letter.id);
  }
}
