import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GojsAngularModule } from 'gojs-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlowDiagramComponent } from './flow-diagram/flow-diagram.component';

@NgModule({
  declarations: [
    AppComponent,
    FlowDiagramComponent
  ],
  imports: [
    BrowserModule,
    GojsAngularModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
