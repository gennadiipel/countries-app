import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/interfaces/country.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  countries: Country[]
  constructor() { }

  ngOnInit(): void {
  }

  getCountries(countries: Country[]): void {
    this.countries = countries
  }

}
