import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import { GameComponent } from './components/game/game.component';
import { WordLengthComponent } from './components/word-length/word-length.component';
import { WordRowComponent } from './components/game/word-row/word-row.component';
import { KeyboardComponent } from './components/game/keyboard/keyboard.component';


@NgModule({
  declarations: [AppComponent, GameComponent, WordLengthComponent, WordRowComponent, KeyboardComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

