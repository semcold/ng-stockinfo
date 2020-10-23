import { StockCandles, ListResolution } from './../../interfaces';
import { DataGridComponent } from './../data-grid/data-grid.component';
import { DataService } from './../../services/data.service';
import { Component, ElementRef, Input, OnInit, ViewChild, enableProdMode } from '@angular/core';

import { AsyncSubject, BehaviorSubject } from 'rxjs';
import { stringify } from 'querystring';
import { DxChartComponent } from 'devextreme-angular';

if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}

@Component({
  selector: 'app-candlestick',
  templateUrl: './candlestick.component.html',
  styleUrls: ['./candlestick.component.scss']
})
export class CandlestickComponent implements OnInit {

  loadIndicatorVisible = false;
  loadOnCandlesVisible = false;
  buttonText = "Update";
  companyName;
  from: Date = new Date();
  to: Date = new Date();

  resolutions: any[];
  resolution;
  priority: any;
  currentResolution: any[] = [];
  stockCandles: StockCandles[] = [];
  listResolution: ListResolution[];
  timestamp;

  fromDateValue;
  toDateValue;


  constructor(
    private dataService: DataService,
    //
  ) {
    this.resolutions = [
      '1',
      '5',
      '15',
      '30',
      '60',
      'D',
      'W',
      'M'
    ];
    this.dataService.resolution = null;
    this.resolution = this.dataService.resolution;

   }

  ngOnInit(): void {
    this.fromDateValue = this.dataService.dateFrom;

    const subject = new BehaviorSubject(this.stockCandles);

    // subject.subscribe(x => console.log(x));
    subject.next(this.dataService.candles);
    // console.log(subject.getValue())
    this.stockCandles = subject.getValue();
    // subject.subscribe(x => {
      // for(var i=0; i < x.c.length; i++);
      // console.log(x)
    // });
    subject.complete();
    // this.getStockPrices();

    }

  onValueChanged($event){
    this.resolution = $event.value;
  }

  getStockPrices() {
    this.stockCandles = [];
    const subject = new BehaviorSubject(this.stockCandles);
    subject.next(this.dataService.candles);
    this.stockCandles = subject.getValue();
    subject.subscribe(x => {
      // for(let i=0; i < x.length; i++) { }
      console.log(x);
    });
    subject.complete();

    return this.stockCandles;
  }

  getClick() {
    this.loadOnCandlesVisible = true;
    this.stockCandles = [];
    this.dataService.resolution = this.resolution;
    this.dataService.getStockCandles()
      .subscribe((candle) => {
        const candles = candle.t.map((t, i) => ({
            c: candle.c[i],
            h: candle.h[i],
            l: candle.l[i],
            o: candle.o[i],
            t: new Date(t * 1000),
            s: candle.s,
            v: candle.v[i],
          }));
        this.dataService.candles.push(...candles);
        this.stockCandles = this.dataService.candles;
        this.companyName = this.dataService.companyName;
        this.loadOnCandlesVisible = false;
      });

  }

  onClick(data) {
    this.buttonText = "Updating";
    this.loadIndicatorVisible = true;
    this.dataService.getStockCandles()
      .subscribe((candle) => {
        const candles = candle.t.map((t, i) => ({
            c: candle.c[i],
            h: candle.h[i],
            l: candle.l[i],
            o: candle.o[i],
            t: new Date(t * 1000),
            s: candle.s,
            v: candle.v[i],
          }));
        this.stockCandles.push(...candles);
        console.log(this.stockCandles);
        this.buttonText = "Update the Candlestick";
        this.loadIndicatorVisible = false;
        return this.stockCandles;
      });
}

onDateFromChanged(from) {
  this.dataService.dateFrom = Math.floor((from.value.getTime())/1000);
  // const fromDate = Math.floor((from.value.getTime())/1000);
}
onDateToChanged(to) {
  this.dataService.dateTo = Math.floor((to.value.getTime())/1000);
}

  customizeTooltip(arg) {
    return {
        text: 'Open: $' + arg.openValue + '<br/>' +
            'Close: $' + arg.closeValue + '<br/>' +
            'High: $' + arg.highValue + '<br/>' +
            'Low: $' + arg.lowValue + '<br/>'
    };
}


}
