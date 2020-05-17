import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReflexModule } from '../../../reflex/src/lib/reflex.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReflexModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
