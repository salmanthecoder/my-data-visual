import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MyTreeComponent } from './my-tree/my-tree.component';
import { NodeDetailsComponent } from './node-details/node-details.component';

@NgModule({
  declarations: [
    AppComponent,
    MyTreeComponent,
    NodeDetailsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
