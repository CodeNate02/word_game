import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-word-row',
  templateUrl: './word-row.component.html',
  styleUrls: ['./word-row.component.scss']
})
export class WordRowComponent implements OnInit {
  @Input() word:string = '';
  @Input() row:string[]=[];
  constructor() { }
  ngOnInit(): void {
  }

}
