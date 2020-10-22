import { Pipe, PipeTransform } from "@angular/core";
import { StockSymbol } from '../services/data.service';

@Pipe({
    name: 'busFilter'
})

export class FilterPipe implements PipeTransform {
    transform(stockSymbol: StockSymbol[], search = '', field: string): StockSymbol[] {
		if (!search.trim()) {
			return stockSymbol
		}

		return stockSymbol.filter(station => {
			return station.description.toLowerCase().includes(search.toLowerCase())
		})
	}
}
