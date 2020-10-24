import { StockCandles } from './../../interfaces';
import { StockSymbol, CompanyProfile } from './../../services/data.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';

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
  stockSymbol: StockSymbol[];
  stockCandles: StockCandles[] = [];
  getSub: Subscription;

  constructor(
    private dataService: DataService
  ) {
      this.profilesDataSourceStorage = [];

    }

  ngOnInit() {
    this.getSub = this.dataService.getStockSymbol()
      .subscribe((result) => {
        this.stockSymbol = result.filter(i => i.description !== '' && i.currency !== '' || i.description !== '' && i.type !== '');
        // console.log(result);
      });
  }

  setKey(key) {
    const symbol = key;
    this.dataService.displaySymbol = symbol; // saving symbol in Service
    this.dataService.candles = []; // reading data for future candles in service
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
          // console.log('Я думаю ты нажал на: ' + item.name);
          // console.log('Текущий символ: ' + item.symbol);
          // console.log('Текущий символ: ' + item.symbol);
          this.getUniqueCompany(this.dataService.displaySymbol); // sorting the stored list by unique symbol
          // if (this.profiles.find(x => x.symbol === item.symbol) === undefined) {
          // }
        }
    });
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
    console.log(key);
}
  ngOnDestroy() {
    if (this.getSub) {
      this.getSub.unsubscribe();
    }
  }
}
