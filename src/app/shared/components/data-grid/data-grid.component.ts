import { StockCandles } from './../../interfaces';
import { StockSymbol, CompanyProfile } from './../../services/data.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';
import DataSource from 'devextreme/data/data_source';
import { DxDataGridComponent } from 'devextreme-angular';


@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent implements OnInit, OnDestroy {

  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;

  animation = true;
    //orders: Order[];
    saleAmountHeaderFilter: any;
    applyFilterTypes: any;
    currentFilter: any;
    showFilterRow: boolean;
    showHeaderFilter: boolean;

  searchStr = '';
  searchValue = '';
  searchPlaceholder = 'Name of Company';
  searchField = 'name';

  companyProfile: any;
  cProfile: any = [];
  stockSymbol: StockSymbol[];
  stockCandles: StockCandles[]=[];
  cProfileDataSourceStorage: CompanyProfile[]=[];
  getSub: Subscription;
  cProfileSub: Subscription;
  symbol: string;

  dataSource: DataSource;

  constructor( private dataService : DataService) {

     }


     changeCriteria(field: string) {
      const namesMap = {
        name: 'Name of Company',
        symbol: 'Symbol'
      };
      this.searchPlaceholder = namesMap[field];
      this.searchField = field;
    }

  ngOnInit(): void {
    this.stockSymbol = [];
    this.getSub = this.dataService.getStockSymbol()
      .subscribe((result) => {
        this.stockSymbol = result;
        console.log(result);
      });

    // this.companyProfile = [];
    // this.cProfileSub = this.dataService.getBySymbol(this.symbol)
    //   .subscribe((res) => {
    //     let item = res;
    //     console.log(res);
    //     this.cProfileDataSourceStorage.push(item);

    //   });
  }

  getcProfileDataSourceStorage(cProfile) {
    console.log(this.cProfileDataSourceStorage);
    console.log('у меня тут: ' + cProfile);
    //this.symbol = cProfile;
    this.dataService.displaySymbol = cProfile;
    this.dataService.candles = this.stockCandles;
    console.log(this.dataService.candles);


    if (cProfile == undefined)
      {
        console.log('пусто')
        return
      }
    else {
      console.log('не пусто: ' + this.cProfileDataSourceStorage);
      return this.cProfileDataSourceStorage;
    }

  }

  getBySymbol() {
    this.dataService.getBySymbol()
      .subscribe((res) => {
        if (res==undefined || null) {
          console.log('символов нет:' + res)
        }
        else {
          let item = res;
          console.log('result ' + JSON.stringify(res));
          this.cProfileDataSourceStorage = [];
          this.cProfileDataSourceStorage.push(item);
          //this.companyProfile = Object.keys(obj).map(key => ({key, obj}));
        }
    });

    this.dataService.getStockCandles()
      .subscribe((candle) => {
        if (candle==undefined || candle.s=='no_data') {
          console.log('свечей нет:' + candle)
        }
        else {
          //let item = candle;
        console.log(candle);
        //this.stockPrices = res;
        //this.stockPrices.push(item);
        console.log('символ в график: ' + this.dataService.displaySymbol)
        //return this.stockPrices

        let candles = candle['t'].map(function(t,i) {
          return {
            c: candle['c'][i],
            h: candle['h'][i],
            l: candle['l'][i],
            o: candle['o'][i],
            t: new Date(t*1000),
            s: candle['s'],
            v: candle['v'][i],
          }
        })
        this.stockCandles = [];
        this.stockCandles.push(...candles);
        console.log(this.stockCandles)
        }
      });
  }

  clickRow() {
    //this.cProfileDataSourceStorage = undefined;
    console.log('был произведен клик: ' + this.symbol)
    this.getBySymbol();
  }


//   getTasks(key) {
//     let item = this.cProfileDataSourceStorage.find((i) => i.key === key);
//     if (!item) {
//         item = {
//             key: key,
//             dataSourceInstance: new DataSource({
//                 store: new ArrayStore({
//                     data: this.companyProfile,
//                     key: "ID"
//                 }),
//                 //filter: ["EmployeeID", "=", key]
//             })
//         };
//         this.cProfileDataSourceStorage.push(item)
//     }
//     return item.dataSourceInstance;
// }





  ngOnDestroy() {
    this.cProfileSub.unsubscribe();
    if (this.getSub) {
      this.getSub.unsubscribe();
    }


  }

}
