import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-word-length',
  templateUrl: './word-length.component.html',
  styleUrls: ['./word-length.component.scss'],
})
export class WordLengthComponent implements OnInit {
  @Input() df: string|undefined;
  @Output() onNewWord: EventEmitter<number> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
  newWord(n: string): void {
    this.onNewWord.emit(parseInt(n));
  }
}
