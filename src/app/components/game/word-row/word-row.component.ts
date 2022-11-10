import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-word-row',
  templateUrl: './word-row.component.html',
  styleUrls: ['./word-row.component.scss'],
})
export class WordRowComponent implements OnInit {
  @Input() clues: (null | boolean)[] = [];
  @Input() row: string[] = [];
  indexes: number[] = [];
  constructor() {}
  ngOnInit(): void {}
}
