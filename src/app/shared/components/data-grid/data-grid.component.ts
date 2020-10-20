import { StockSymbol, CompanyProfile } from './../../services/data.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent implements OnInit, OnDestroy {

  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
    orders: Order[];
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
  cProfileDataSourceStorage: CompanyProfile[]=[];
  getSub: Subscription;
  cProfileSub: Subscription;
  symbol: string;

  constructor( private dataService : DataService ) {

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

    this.companyProfile = [];
    this.cProfileSub = this.dataService.getBySymbol()
      .subscribe((res) => {
        this.companyProfile = res;
        console.log(res);
        this.cProfileDataSourceStorage.push(this.companyProfile);
        //this.companyProfile = Object.keys(obj).map(key => ({key, obj}));

      });
  }

  getcProfileDataSourceStorage(key) {
    console.log(this.cProfileDataSourceStorage);
    return this.cProfileDataSourceStorage;
    // let item = this.cProfile.find((i) => i.key === key);
    // if (!item) {
    //     item = {
    //         key: key,
    //         dataSourceInstance: new DataSource({
    //             store: new ArrayStore({
    //                 data: this.cProfileDataSourceStorage,
    //                 key: "name"
    //             }),
    //             filter: ["name", "=", key]
    //         })
    //     };
    //     this.cProfileDataSourceStorage.push(item)
    //     console.log(this.cProfileDataSourceStorage);
    // }
    // return item.dataSourceInstance;
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
    if (this.getSub) {
      this.getSub.unsubscribe();
    }
    if (this.cProfileSub)
      this.cProfileSub.unsubscribe();
  }

}
