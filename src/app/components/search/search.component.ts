import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Country } from 'src/app/interfaces/country.interface';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {

  allCountries: Country[] = null
  countries: Country[] = null
  searchSubscription$: Subscription

  @Output() onSearchButtonClicked: EventEmitter<Country[]> = new EventEmitter()

  constructor(
    private _countriesService: CountriesService
  ) { }

  ngOnInit(): void {
  }

  search(event: any): void {
    if (event.target.value.length == 0) {
      // fix this repeat
      this.countries = null
      this.allCountries = null
      return null
    }

    // unsubscribes from previous request and subscribes to a new one
    // that can help with errors when previous request finished later the next
    // todo try to find new solution
    if (this.searchSubscription$) this.searchSubscription$.unsubscribe()

    this.searchSubscription$ = this._countriesService.getByName(event.target.value)
      .subscribe(countries => {
        this.allCountries = [...countries]
        this.countries = countries.sort((a, b) => (a.population > b.population) ? -1 : 1).splice(0, 5)
      }, (error: HttpErrorResponse) => {
        if (error.status == 404) {
          console.log(404)
        }

        this.countries = null
        this.allCountries = null
      })
  }


  returnResults(): void {
    this.onSearchButtonClicked.emit(this.allCountries)
  }

}