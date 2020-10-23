import { StockCandles } from './../../interfaces';
import { StockSymbol, CompanyProfile } from './../../services/data.service';
import { Component, OnDestroy, OnInit, ViewChild, enableProdMode } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';
import DataSource from 'devextreme/data/data_source';
import { DxDataGridComponent } from 'devextreme-angular';
import ArrayStore from 'devextreme/data/array_store';

if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent implements OnInit, OnDestroy {

  animation = true;

  profilesDataSourceStorage: any;
  profiles: CompanyProfile[] = [];
  profile;
  loadIndicatorVisible = false;
  logo: string;

  saleAmountHeaderFilter: any;
  applyFilterTypes: any;
  currentFilter: any;
  showFilterRow: boolean;
  showHeaderFilter: boolean;

  companyProfile: any;
  cProfile: any = [];
  stockSymbol: StockSymbol[];
  stockCandles: StockCandles[] = [];
  cProfileDataSourceStorage: CompanyProfile[] = [];
  getSub: Subscription;
  cProfileSub: Subscription;
  symbol: string;

  dataSource: DataSource;

  constructor(
    private dataService: DataService
  ) {
      this.profilesDataSourceStorage = [];

    }

  ngOnInit() {
    this.getSub = this.dataService.getStockSymbol()
      .subscribe((result) => {
        this.stockSymbol = result;
        console.log(result);
      });
  }

  getProfiles(key) {
    this.dataService.displaySymbol = key;
    this.dataService.candles = this.stockCandles;
    // console.log(this.dataService.candles);


    if (key === undefined)
      {
        console.log('пусто');
      }
    else {
      console.log(this.profiles);
      console.log('не пусто: ' + this.profilesDataSourceStorage);
      return this.profiles;
    }
  }

  getcProfileDataSourceStorage(cProfile) {
    console.log(this.profiles);
    console.log('у меня тут: ' + cProfile);
    // this.symbol = cProfile;
    this.dataService.displaySymbol = cProfile;
    this.dataService.candles = this.stockCandles;
    console.log(this.dataService.candles);


    if (cProfile === undefined)
      {
        console.log('пусто');
        // this.loadIndicatorVisible = false;
        return;
      }
    else {
      console.log(this.profiles);
      return this.profiles;
    }
  }



  getBySymbol() {
    this.dataService.getBySymbol()
      .subscribe((res) => {
        if (res === undefined || null || res.name === undefined) {
          console.log('нет данных:' + res);
        }
        else {

          const item = res;
          item.symbol = this.dataService.displaySymbol;
          if (this.profiles.find(x => x.symbol === item.symbol) === undefined) {
            // this.profiles = [];
            this.profiles.push(item);
            this.loadIndicatorVisible = false;
          }
          // console.log('result ' + JSON.stringify(res));
          // this.cProfileDataSourceStorage = [];
          // this.cProfileDataSourceStorage.push(item);

        }
    });


  }

  setKey(key) {
    const symbol = key;
    this.dataService.displaySymbol = symbol; // saving symbol in Service
    this.dataService.candles = []; // reading data for future candles in service
    console.log(this.dataService.displaySymbol);
    console.log(this.profile);
    this.dataService.dateFrom = Math.floor(Math.abs(((new Date()).getTime() - (new Date()).getTime())/(24*60*60*1000)));
    // this.dataService.dateTo = Math.floor(new Date().getTime()/1000);
    // this.dataService.dateFrom = Math.floor(this.dataService.dateTo - (7*24*60*60));
    return this.profile;
  }

  clickRow() {
    console.log('был произведен клик: ' + this.dataService.displaySymbol);
    this.getProfilesCompany();
    this.loadIndicatorVisible = true;
  }

  getProfilesCompany() {
    // --------------------------------
    // get data from Company Profile 2:
    this.dataService.getBySymbol()
      .subscribe((res) => {
        if (res === undefined || null || res.name === undefined) {
          console.log('нет данных:' + res);
        }
        else {
          const item = res;
          item.symbol = this.dataService.displaySymbol;
          this.profiles.push(item);
          this.loadIndicatorVisible = false;
          this.dataService.companyName = item.name;
          console.log('Я думаю ты нажал на: ' + item.name);
          console.log('Текущий символ: ' + item.symbol);
          console.log('Текущий символ: ' + item.symbol);
          this.getUniqueCompany(this.dataService.displaySymbol); // sorting the stored list by unique symbol
          // if (this.profiles.find(x => x.symbol === item.symbol) === undefined) {
          // }
        }
    });
    // --------------------------------
    // get data for Stock Candles
    // this.dataService.resolution = undefined;
    // this.dataService.getStockCandles()
    //   .subscribe((candle) => {
    //     if (candle === undefined || candle.s === 'no_data') {
    //       console.log('свечей нет:' + candle);
    //     }
    //     else {
    //     // converting in readable format for devexpresse's candlestick:
    //     const candles = candle.t.map((t, i) => ({
    //         c: candle.c[i],
    //         h: candle.h[i],
    //         l: candle.l[i],
    //         o: candle.o[i],
    //         t: new Date(t * 1000),
    //         s: candle.s,
    //         v: candle.v[i],
    //       }));
    //     this.stockCandles = [];
    //     this.stockCandles.push(...candles);
    //     }
    //   });
      // --------------------------------
  }

  getUniqueCompany(key) {
    this.profile = [];
    let item = this.profilesDataSourceStorage.find((i) => i.key === key);
    if (!item) {
        item = {
            key,
            dataSourceInstance: new DataSource({
                store: new ArrayStore({
                    data: this.profiles,
                    key: 'symbol'
                }),
                filter: ['symbol', '=', key]
            })
        };
        this.profilesDataSourceStorage.push(item);
    }
    this.profile = item.dataSourceInstance;
    console.log(this.profile._items.name);
}
  ngOnDestroy() {
    if (this.getSub) {
      this.getSub.unsubscribe();
    }
  }
}
