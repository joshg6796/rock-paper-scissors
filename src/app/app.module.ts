import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { ChoiceComponent } from './choice/choice.component';

@NgModule({
  declarations: [
    AppComponent,
    ChoiceComponent
  ],
  imports: [
    BrowserModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
