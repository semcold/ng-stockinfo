import { DataService } from './../../services/data.service';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { StockPrice } from '../../interfaces';


@Component({
  selector: 'app-candlestick',
  templateUrl: './candlestick.component.html',
  styleUrls: ['./candlestick.component.scss']
})
export class CandlestickComponent implements OnInit {

  stockObject: any;
  stockPrices: StockPrice[];

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {

    this.stockObject = [];
    this.dataService.getStockPrices()
      .subscribe((result) => {
        this.stockObject = result;
        console.log(result);
        this.stockPrices.push(this.stockObject);
      });

  }

  getStockPrices() {
    console.log(this.stockPrices)
    return this.stockPrices
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
