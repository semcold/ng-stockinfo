import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { StockPrice } from '../interfaces';

export class StockSymbol {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
  currency: string;
}

export class CompanyProfile {
  country: string;
  currency: string;
  exchange: string;
  ipo: Date;
  marketCapitalization: number;
  name: string;
  phone: number;
  shareOutstanding: number;
  ticker: string;
  weburl: string;
  logo: string;
  finnhubIndustry: string;
}

@Injectable({
  providedIn: 'root'
})

export class DataService {

  displaySymbol: string = "AAPL";
  constructor(private http: HttpClient) { }

  getStockSymbol(): Observable<any> {
    return this.http.get(`${environment.APIURL}/symbol?exchange=US&token=${environment.token}`)
    .pipe(map((response: {[key: string]: any}) => {
      return Object
        .keys(response)
        .map(key => ({
          ...response[key],
          id: key
        }))
        // .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    }))
  };

  // getCompanyProfile(): Observable<any> {
  //   return this.http.get(`${environment.APIURL}/profile2?symbol=${symbol}&token=${environment.token}`);
  // }

  // getBySymbol(): Observable<any> {
	// 	return this.http.get<StockSymbol>(`${environment.APIURL}/profile2?symbol=${this.displaySymbol}&token=${environment.token}`)
	// 		.pipe(map((stockSymbol: StockSymbol) => {
	// 			return {
	// 				...stockSymbol,
	// 				displaySymbol: 'AAPL'
	// 			}
	// 		}))
  // }

  getBySymbol() {
    return this.http.get<CompanyProfile>(`${environment.APIURL}/profile2?symbol=${this.displaySymbol}&token=${environment.token}`);
  }

  // getBySymbol(symbol: string): Observable<StockSymbol> {
  //   return this.http.get<StockSymbol>(`${environment.APIURL}/profile2?symbol=${symbol}&token=${environment.token}`)
  //   .pipe(map((content: StockSymbol) => {
  //     return {
  //       ...content,
  //       symbol
  //     }
  //   }))
  // }

  getStockPrices() {
    return this.http.get(`${environment.APIURL}/stock/candle?symbol=${this.displaySymbol}&resolution=1&from=1572651390&to=1572910590&token=${environment.token}`);
  }

}
