import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Keyboard, KEYBOARD_EMPTY } from '../game.component';
@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss'],
})
export class KeyboardComponent implements OnInit {
  @Input() keyboard: Keyboard = KEYBOARD_EMPTY();
  @Output() keyclick: EventEmitter<string> = new EventEmitter();
  keys: string[] = [];
  keyboardClick(key: string) {
    this.keyclick.emit(key);
  }
  constructor() {
    this.keys = Object.keys(this.keyboard);
  }
  ngOnInit(): void {}
}
