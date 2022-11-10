import { Component, OnInit } from '@angular/core';
import randomWords from 'random-words';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  guesses: GuessArray = [[]];
  length: number = 5;
  clues: ClueArray = [LongArray(this.length)];
  word: string = getWord(this.length);
  /*Type event catches and processes keypresses*/
  type(event: KeyboardEvent): void {
    let g: string[] = this.guesses[this.guesses.length - 1];
    //If there are still characters to type, the keypress is a key of length 1, and the key is a letter, type it
    if (
      event.key.length == 1 &&
      g.length < this.word.length &&
      event.key.match('[a-zA-Z]')
    ) {
      g.push(event.key.toUpperCase());
    }
    //If key is enter and you have typed a guess the same length as the target word, guess
    else if (event.key == 'Enter' && g.length == this.word.length) {
      this.guess(g);
    }
    //If the key is backspace and there are characters to remove, remove one
    else if (g.length > 0 && event.key == 'Backspace') {
      g.pop();
    }
  }
  /*When enter is pressed on a full guess, guess the word*/
  guess(s: string[]): void {
    let unused = this.word.split(''); //Full array of characters in the word
    let c = this.clues.length - 1; //Convenience variable
    s.forEach((x, index) => {
      //Toggle each letter to lowercase
      x = x.toLowerCase();
      if (this.word[index] == x) {
        //If this character in the word MATCHES the character in the guess
        //Then the guess for this character is correct.  Clues should be true.
        this.clues[this.clues.length - 1][index] = true;
        //Remove this character from the unused characters array.  Ensure that only 1 clue per character in the word is given.  (IE, if you guess a word with 2 s's and there's only one in the correct word, it'll flag it as false)
        unused.splice(index, 1);
      }
    });
    s.forEach((item, index) => {
      //Loop through the characters a 2nd time
      let f;
      if (
        !this.clues[c][index] && //If the character hasn't already been marked as correct
        (f = unused.findIndex((x) => x == item)) != -1 //Check if it occurs in the remaining unused characters
      ) {
        this.clues[c][index] = false; //Mark the clue as false, meaining that the character is in the word but not at the correct position.
        unused.splice(f, 1); //Remove the character from the unused characters array.  See above explanation.
      }
    });
    //New Line, create new empty guess and completely null clues array;
    this.guesses.push([]); //Add a new guess
    this.clues.push(LongArray(this.length));
  }
  setLength(x: number) {
    this.length = x;
    this.generateNewWord();
  }
  generateNewWord(): void {
    this.guesses = [[]];
    this.word = getWord(this.length);
    this.clues = [LongArray(this.length)];
  }
  constructor() {
    window.onkeydown = (e) => this.type(e);
    this.word = getWord(this.length);
  }
  ngOnInit(): void {}
}

type GuessArray = string[][];
type ClueArray = (true | false | null)[][];
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
/**LongArray
 * Instantly generates array of length n with value p
 * n: Array Length
 * p: Array placeholder, the value that will be in every slot
 */
const LongArray: (n: number, p?: any) => any[] = (n, p = null) => {
  let r = [];
  for (let i = 0; i < n; i++) {
    r.push(p);
  }
  return r;
};
