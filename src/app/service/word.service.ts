import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs'
import randomWords from 'random-words'

@Injectable({
  providedIn: 'root',
})
export class WordService {
  length = 5;
  word: string;
  constructor() {
    this.word = getWord(this.length);
  }
  getWord() {
    return of(this.word);
  }
  setLength(x: number) {
    this.length = x;
    return this.length;
  }
  newWord() {
    this.word = getWord(this.length);
    return this.word;
  }
}

/**Get Word
 * Since the script doesn't have a 'min-length', repeatedly try to get a word
 * until you get one within the trarget range.
 * Works reliably for words of length between 2 and 14 (inclusively).
 */
const getWord: (min_length: number, max_length?: number) => string = (
  min_length,
  max_length = min_length
) => {
  let word: string = randomWords({ exactly: 1, maxLength: max_length })[0];
  if (word.length >= min_length) return word;
  else return getWord(min_length, max_length);
};
