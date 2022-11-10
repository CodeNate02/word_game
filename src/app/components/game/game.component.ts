import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  @Input() word: string = '';
  guesses: GuessArray = [[]];

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
      this.guess(g.join(''));
    }
    //If the key is backspace and there are characters to remove, remove one
    else if (g.length > 0 && event.key == 'Backspace') {
    }
  }
  /*When enter is pressed on a full guess, guess the word*/
  guess(s: string): void {
    this.guesses.push([]);
    console.log(s);
  }

  constructor() {
    window.onkeydown = (e) => this.type(e);
  }
  ngOnInit(): void {}
}

type GuessArray = string[][];
