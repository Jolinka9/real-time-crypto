import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CryptoRowComponent } from './crypto-row/crypto-row.component';
import { CryptoTableComponent } from './crypto-table/crypto-table.component';
import { CryptoFilterPipe } from './crypto-filter.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CryptoRowComponent,
    CryptoTableComponent,
    CryptoFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
