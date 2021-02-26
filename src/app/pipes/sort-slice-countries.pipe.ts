import { Pipe, PipeTransform } from "@angular/core";
import { Country } from "../interfaces/country.interface";

@Pipe({
    name: 'sortSliceCountries',
    pure: false
})

export class SortSliceCountriesPipe implements PipeTransform {
    transform(countries: Country[], shouldSort: boolean = true, shouldSlice: boolean = true, sliceStart: number = 0, sliceEnd: number = 5): Country[] {
        if (shouldSort) countries.sort((a, b) => (a.population > b.population) ? -1 : 1)
        return (shouldSlice) ? countries.slice(sliceStart, sliceEnd) : countries
    }
}