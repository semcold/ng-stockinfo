import { StockCandles, ListResolution } from './../../interfaces';
import { DataGridComponent } from './../data-grid/data-grid.component';
import { DataService } from './../../services/data.service';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { AsyncSubject, BehaviorSubject } from 'rxjs';
import { stringify } from 'querystring';
import { DxChartComponent } from 'devextreme-angular';


@Component({
  selector: 'app-candlestick',
  templateUrl: './candlestick.component.html',
  styleUrls: ['./candlestick.component.scss']
})
export class CandlestickComponent implements OnInit {

  resolutions: any[];
  priority: any;
  currentResolution: any[] = [];
  stockCandles: StockCandles[]=[];
  listResolution: ListResolution[];
  timestamp;


  constructor(
    private dataService: DataService,
    //
  ) {
    this.listResolution = dataService.getResolution();
    this.resolutions = [
      "1",
      "5",
      "15",
      "30",
      "60",
      "D",
      "W",
      "Y"
    ];
    //this.priority = this.resolutions[2];
    // this.currentResolution[0] = this.listResolution[1].subject;

   }

  ngOnInit(): void {

    // this.dataService.getStockPrices()
    //   .subscribe((res) => {
    //     let stock = res['t'].map(function(t,i) {
    //       return {
    //         c: res['c'][i],
    //         h: res['h'][i],
    //         l: res['l'][i],
    //         o: res['o'][i],
    //         t: new Date(t*1000),
    //         s: res['s'],
    //         v: res['v'][i],
    //       }
    //     })
    //     this.stockPrices.push(...stock);
    //     console.log(this.stockPrices)
    //   });
  }

  onValueChanged($event){
    // this.currentResolution = [];
    this.dataService.resolution=$event.value;
    console.log(this.dataService.resolution);

    // this.listResolution.forEach((item, index) => {

    //     if(item.priority == $event.value) {
    //       this.currentResolution.push(this.listResolution[index].subject);
    //     }
    //     console.log(this.currentResolution)
    // });
}

  getStockPrices() {
    const subject = new BehaviorSubject(this.stockCandles);
    //subject.subscribe(x => console.log(x));
    subject.next(this.dataService.candles);
    //console.log(subject.getValue())
    this.stockCandles = subject.getValue()
    //subject.subscribe(x => {
      //for(var i=0; i < x.c.length; i++);
      //console.log(x)
    //});
    subject.complete();

    return subject.getValue();
  }

  customizeTooltip(arg) {
    return {
        text: "Open: $" + arg.openValue + "<br/>" +
            "Close: $" + arg.closeValue + "<br/>" +
            "High: $" + arg.highValue + "<br/>" +
            "Low: $" + arg.lowValue + "<br/>"
    };
}


}
