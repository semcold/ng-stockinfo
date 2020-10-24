import { ListResolution } from './../interfaces';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
  symbol: string;
}

const resolutions: ListResolution[] = [{
  subject: '1',
  priority: '1'
}, {
  subject: '5',
  priority: '5'
}, {
  subject: '15',
  priority: '15'
}, {
  subject: '30',
  priority: '30'
}, {
  subject: '60',
  priority: '60'
}, {
  subject: 'D',
  priority: 'D'
},
{
  subject: 'W',
  priority: 'W'
},
{
  subject: 'M',
  priority: 'M'
},
];

@Injectable({
  providedIn: 'root'
})

export class DataService {
  constructor(private http: HttpClient) {}

  candles;
  resolution;
  companyName;
  dateFrom;
  dateTo;
  displaySymbol;

  getResolution(): ListResolution[] {
    return resolutions;
  }

  getStockSymbol(): Observable<any> {
    return this.http.get(`${environment.APIURL}/${environment.stock}/symbol?exchange=US&token=${environment.token}`);
  }

  getBySymbol() {
    return this.http.get<CompanyProfile>(`${environment.APIURL}/${environment.stock}/profile2?symbol=${this.displaySymbol}&token=${environment.token}`);
  }

  getStockCandles(): Observable<any> {
    return this.http.get(`${environment.APIURL}/${environment.stock}/candle?symbol=${this.displaySymbol}&resolution=${this.resolution}&from=${this.dateFrom}&to=${this.dateTo}&token=${environment.token}`);
  }
}
