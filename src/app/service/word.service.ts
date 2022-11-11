import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import EOWL from '../../assets/eowl'
import randomWords from 'random-words';

@Injectable({
  providedIn: 'root',
})
export class WordService {
  wordList:string[] = [];
  length:number = 5;
  constructor(private http: HttpClient) {
  }
  getWord(length=this.length):string {
    if(length) this.setLength(length);
    return this.wordList[
      Math.floor(Math.random()*this.wordList.length)
    ];
    // return this.http.get<string>(
    //   `https://random-word-api.herokuapp.com/word?length=${this.length}&lang=en`
    // );
  }
  setLength(x: number) {
    if(1 < x && x <= 10){
      this.length = x;
      this.wordList = EOWL.filter(w=>w.length==x);

    }
    else alert('Werdul only supports words of length between 2 and 10 characters long')
    return this.length;
  }
  getLength(){
    return this.length;
  }
  // newWord() {
  //   this.word = getWord(this.length);
  //   return this.word;
  // }
}

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
