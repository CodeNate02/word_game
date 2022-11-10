import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { GameComponent } from './components/game/game.component';
import { WordLengthComponent } from './components/word-length/word-length.component';
import { LetterBoxComponent } from './components/game/letter-box/letter-box.component';


@NgModule({
  declarations: [AppComponent, GameComponent, WordLengthComponent, LetterBoxComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

