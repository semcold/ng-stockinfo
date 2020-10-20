import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StocksInfoComponent } from './stocks-info/stocks-info.component';
import { DataGridComponent } from './shared/components/data-grid/data-grid.component';
import { CandlestickComponent } from './shared/components/candlestick/candlestick.component';
import { WebsocketComponent } from './shared/components/websocket/websocket.component';
import { DevExtremeModule, DxButtonModule, DxDataGridModule, DxTemplateModule, DxVectorMapModule } from 'devextreme-angular';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './shared/services/data.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    StocksInfoComponent,
    DataGridComponent,
    CandlestickComponent,
    WebsocketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DevExtremeModule,
    DxButtonModule,
    DxVectorMapModule,
    HttpClientModule,
    DxDataGridModule,
    DxTemplateModule,
    FormsModule

  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
