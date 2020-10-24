import { StockCandles } from './../../interfaces';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-candlestick',
  templateUrl: './candlestick.component.html',
  styleUrls: ['./candlestick.component.scss']
})
export class CandlestickComponent implements OnInit {

  loadIndicatorVisible = false;
  buttonText = "Update";
  companyName;
  to: Date = new Date();
  from: Date = new Date((Math.floor(new Date().getTime()/1000-(14*24*60*60)))*1000);

  resolutions: any[];
  resolution;
  priority: any;
  currentResolution: any[] = [];
  stockCandles: StockCandles[] = [];

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
   }

  ngOnInit(): void {
    this.dataService.dateFrom = Math.floor(this.from.getTime()/1000);
    this.dataService.dateTo = Math.floor(this.to.getTime()/1000);
    const subject = new BehaviorSubject(this.stockCandles);
    // subject.subscribe(x => console.log(x));
    subject.next(this.dataService.candles);
    this.stockCandles = subject.getValue();
    // subject.subscribe(x => {
      // for(var i=0; i < x.c.length; i++);
      // console.log(x)
    // });
    subject.complete();
  }

  onValueChanged($event){
    this.resolution = $event.value;
  }
  getClick() {
    this.stockCandles = [];
    this.dataService.resolution = this.resolution;
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
        this.dataService.candles.push(...candles);
        this.buttonText = "Update the Candlestick";
        this.loadIndicatorVisible = false;
        this.stockCandles = this.dataService.candles;
        this.companyName = this.dataService.companyName;
      });
  }

  onDateFromChanged(from) {
    this.dataService.dateFrom = Math.floor((from.value.getTime())/1000);
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
