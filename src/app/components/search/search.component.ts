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
export class SearchComponent {

  countries: Country[] = []
  searchSubscription$: Subscription

  @Output() onSearchButtonClicked: EventEmitter<Country[]> = new EventEmitter()

  constructor(
    private _countriesService: CountriesService
  ) { }

  search(event: any): void {
    if (event.target.value.length == 0) {
      // fix this repeat
      this.countries = []
      return null
    }

    // unsubscribes from previous request and subscribes to a new one
    // that can help with errors when previous request finished later the next
    // todo try to find new solution
    if (this.searchSubscription$) this.searchSubscription$.unsubscribe()

    this.searchSubscription$ = this._countriesService.getByName(event.target.value)
      .subscribe(countries => {
        this.countries = countries
      }, (error: HttpErrorResponse) => {
        this.countries = []
      })
  }


  returnResults(): void {
    this.onSearchButtonClicked.emit(this.countries)
  }

}
