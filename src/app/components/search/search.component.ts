import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/interfaces/country.interface';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {

  countries: Country[] = null

  constructor(
    private _countriesService: CountriesService
  ) { }

  ngOnInit(): void {
  }

  search(event: any): void {
    if (event.target.value.length == 0) {
      return null
    }

    this._countriesService.getByName(event.target.value)
    .subscribe(countries => {
      console.log(countries)
    }, (error: HttpErrorResponse) => {
      if (error.status == 404) {
        console.log(404)
      }
    })
  }

}
