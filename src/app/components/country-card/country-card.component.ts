import { Component, Input, OnInit } from '@angular/core';
import { Country } from 'src/app/interfaces/country.interface';

@Component({
  selector: 'app-country-card',
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.sass']
})
export class CountryCardComponent implements OnInit {

  @Input() country: Country

  constructor() { }

  ngOnInit(): void {
  }

}
