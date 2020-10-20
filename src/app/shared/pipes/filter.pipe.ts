import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'busFilter'
})

export class FilterPipe implements PipeTransform {
    transform(items: any, value: string, field: string): any {
        if (items.length === 0 || !value) {
            return items;
        }

        return items.filter((i) => {
            const t = Object.assign({}, i)
            if (!isNaN(t[field])) {
                t[field] += '';
            }

            if (field === 'name') {
                t[field] = t['description'];
            }
            return t[field].toLowerCase().indexOf(value.toLowerCase()) !== -1;
        });
    }
}
