import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReflexModule } from '../../../reflex/src/lib/reflex.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    ReflexModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
