import { FilterPipe } from './shared/pipes/filter.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StocksInfoComponent } from './stocks-info/stocks-info.component';
import { DataGridComponent } from './shared/components/data-grid/data-grid.component';
import { CandlestickComponent } from './shared/components/candlestick/candlestick.component';
import { WebsocketComponent } from './shared/components/websocket/websocket.component';
import { DevExtremeModule, DxButtonModule, DxDataGridModule, DxRadioGroupModule, DxRangeSelectorModule, DxTemplateModule, DxVectorMapModule } from 'devextreme-angular';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './shared/services/data.service';
import { FormsModule } from '@angular/forms';
import { Service } from './shared/services/app.service';
import { DxoAggregationModule, DxoBehaviorModule, DxoGridModule, DxoScaleModule, DxoSearchPanelModule } from 'devextreme-angular/ui/nested';

@NgModule({
  declarations: [
    AppComponent,
    StocksInfoComponent,
    DataGridComponent,
    CandlestickComponent,
    WebsocketComponent,
    FilterPipe
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
    FormsModule,
    DxoSearchPanelModule,
    DxoAggregationModule,
    DxoBehaviorModule,
    DxRangeSelectorModule,
    DxoScaleModule,
    DxoGridModule,
    DxRadioGroupModule

  ],
  providers: [
    DataService,
    Service
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
