import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2SmartTableModule } from '@ng-smart-table/ng-smart-table';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, Ng2SmartTableModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
