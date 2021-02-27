import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Country } from 'src/app/interfaces/country.interface';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.sass']
})
export class CountryComponent implements OnInit, OnDestroy {

  country: Country
  getCountrySubscription$: Subscription

  constructor(
    private _countriesService: CountriesService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getCountrySubscription$ = this._route.params.subscribe(params => {
      this._countriesService.getByCode(params.name)
      .subscribe(country => {
        this.country = country
      }, () => {
        this._router.navigate(['/'])
      })
    })
  }

  ngOnDestroy(): void {
    this.getCountrySubscription$.unsubscribe()
  }

}
