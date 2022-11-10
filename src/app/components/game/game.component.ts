import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  @Input() word: string | undefined;
  letters():string[]{
    if(!this.word) return [];
    return this.word.split('');
  }
  wordLength():number{
    return this.word?.length || 0;
  }
  constructor() {}
  ngOnInit(): void {}
}
