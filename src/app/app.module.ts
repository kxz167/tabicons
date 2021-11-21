import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconDisplayComponent } from './icon-display/icon-display.component';

import { ColorSketchModule } from 'ngx-color/sketch';
import { HomeComponent } from './home/home.component'; //THIRD PARTY LIBRARY ngx-color

@NgModule({
  declarations: [
    AppComponent,
    IconDisplayComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ColorSketchModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
