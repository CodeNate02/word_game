import { Component } from '@angular/core';
import randomWords from 'random-words';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title:string = 'word_game';
  length:number = 5;
  word: string;
  constructor() {
    this.word = getWord(this.length);
  }
  setLength(x: number) {
    this.length = x;
    this.generateNewWord();
  }
  generateNewWord(): void {
    this.word = getWord(this.length);
  }
  // log(x:any):void {
  //   console.log(x);
  // }
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
