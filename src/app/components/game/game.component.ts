import { Component, OnInit } from '@angular/core';
import { WordService } from '../../service/word.service';
import randomWords from 'random-words';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  default: number = 5;
  gameState: number = -1;
  guesses: GuessArray = [];
  keys: Keyboard = KEYBOARD_EMPTY();
  //keyboard =

  word: string = '';
  clues: ClueArray = [];
  keyPress(e: KeyboardEvent): void {
    this.type(e.key);
  }
  /*Type event catches and processes keypresses*/
  type(s: string): void {
    if (this.gameState != 0) return;
    let g: string[] = this.guesses[this.guesses.length - 1];
    if (
      g.length < this.word.length && //If the keycode is a key,
      s.match('^[a-zA-Z]$') //Regex check if the keycode is a single letter
    ) {
      g.push(s.toLowerCase()); //Push the key to the guess
    }
    //If key is enter and you have typed a guess the same length as the target word, guess
    else if (s == 'Enter' && g.length == this.word.length) {
      this.guess(g); //Run the guess code on the word
    }
    //If the key is backspace and there are characters to remove, remove one
    else if (g.length > 0 && s == 'Backspace') {
      g.pop();
    }
  }
  /*When enter is pressed on a full guess, guess the word*/
  guess(s: string[]): void {
    let unused = this.word.split(''); //Full array of characters in the word
    let c = this.clues.length - 1; //Convenience variable
    s.forEach((x, index) => {
      //Toggle each letter to lowercase
      if (this.word[index] == x) {
        //If this character in the word MATCHES the character in the guess
        //Then the guess for this character is correct.  Clues should be true.
        this.clues[this.clues.length - 1][index] = true;
        this.keys[x] = 3;
        //Remove this character from the unused characters array.  Ensure that only 1 clue per character in the word is given.  (IE, if you guess a word with 2 s's and there's only one in the correct word, it'll flag it as false)
        unused.splice(
          unused.findIndex((item) => item == x),
          1
        );
      }
    }); //Check for correct placement
    s.forEach((item, index) => {
      //Loop through the characters a 2nd time
      let f = unused.findIndex((x) => x == item);
      if (
        !this.clues[c][index] && //If the character hasn't already been marked as correct
        f != -1 //Check if it occurs in the remaining unused characters
      ) {
        if (this.keys[item] < 2) this.keys[item] = 2;
        this.clues[c][index] = false; //Mark the clue as false, meaining that the character is in the word but not at the correct position.
        unused.splice(f, 1); //Remove the character from the unused characters array.  See above explanation.
      } else {
        if (this.keys[item] < 1) this.keys[item] = 1;
      }
    }); //Check for incorrect placement
    if (this.clues[this.clues.length - 1].filter((x) => !x).length < 1) {
      this.gameState = 2;
    } else if (this.guesses.length == gameLength(this.word.length)) {
      this.gameState = 1;
    } else {
      //New Line, create new empty guess and completely null clues array;
      this.guesses.push([]); //Add a new guess
      this.clues.push(LongArray(this.word.length));
    }
  }
  newGame(x?: number): void {
    this.gameState = -1;
    this.word = this.wordService.getWord(x);
    this.clues = [LongArray(this.wordService.getLength())];
    this.keys = KEYBOARD_EMPTY();
    this.guesses = [[]];
    this.gameState = 0;
  }

  constructor(private wordService: WordService) {
    window.onkeydown = (e) => this.keyPress(e);
    this.newGame(this.default);
  }
  ngOnInit(): void {}
}

type GuessArray = string[][];
type ClueArray = (true | false | null)[][];
// /**Get Word
//  * Since the script doesn't have a 'min-length', repeatedly try to get a word
//  * until you get one within the trarget range.
//  * Works reliably for words of length between 2 and 14 (inclusively).
//  */
// const getWord: (min_length: number, max_length?: number) => string = (
//   min_length,
//   max_length = min_length
// ) => {
//   let word: string = randomWords({ exactly: 1, maxLength: max_length })[0];
//   if (word.length >= min_length) return word;
//   else return getWord(min_length, max_length);
// };
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

export type Keyboard = {
  q: 0 | 1 | 2 | 3;
  w: 0 | 1 | 2 | 3;
  e: 0 | 1 | 2 | 3;
  r: 0 | 1 | 2 | 3;
  t: 0 | 1 | 2 | 3;
  y: 0 | 1 | 2 | 3;
  u: 0 | 1 | 2 | 3;
  i: 0 | 1 | 2 | 3;
  o: 0 | 1 | 2 | 3;
  p: 0 | 1 | 2 | 3;
  a: 0 | 1 | 2 | 3;
  s: 0 | 1 | 2 | 3;
  d: 0 | 1 | 2 | 3;
  f: 0 | 1 | 2 | 3;
  g: 0 | 1 | 2 | 3;
  h: 0 | 1 | 2 | 3;
  j: 0 | 1 | 2 | 3;
  k: 0 | 1 | 2 | 3;
  l: 0 | 1 | 2 | 3;
  z: 0 | 1 | 2 | 3;
  x: 0 | 1 | 2 | 3;
  c: 0 | 1 | 2 | 3;
  v: 0 | 1 | 2 | 3;
  b: 0 | 1 | 2 | 3;
  n: 0 | 1 | 2 | 3;
  m: 0 | 1 | 2 | 3;
  [keychar: string]: 0 | 1 | 2 | 3;
};
export const KEYBOARD_EMPTY: () => Keyboard = () => ({
  q: 0,
  w: 0,
  e: 0,
  r: 0,
  t: 0,
  y: 0,
  u: 0,
  i: 0,
  o: 0,
  p: 0,
  a: 0,
  s: 0,
  d: 0,
  f: 0,
  g: 0,
  h: 0,
  j: 0,
  k: 0,
  l: 0,
  z: 0,
  x: 0,
  c: 0,
  v: 0,
  b: 0,
  n: 0,
  m: 0,
});

const gameLength: (x: number) => number = (x) => {
  if (x > 5) {
    return x;
  }
  return 5;
};
