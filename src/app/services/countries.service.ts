import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError, interval } from "rxjs";
import { Country } from "../interfaces/country.interface";

import {catchError, debounce, delay} from "rxjs/operators";

@Injectable({providedIn: 'root'})

export class CountriesService {

    private _requestUrl: string = "https://restcountries.eu/rest/v2/";

    constructor(
        private _httpClient: HttpClient
    ) {}

    getByName(name: string): Observable<Country[]> {
        return this._httpClient.get<Country[]>(`${this._requestUrl}name/${name}`)
        .pipe(
            // debounce(() => interval(1000)),
            catchError((error: HttpErrorResponse) => {
                return throwError(error)
            })
        )
    }
    

    getByCode(code: string): Observable<Country> {
        return this._httpClient.get<Country>(`${this._requestUrl}alpha/${code}`)
        .pipe(
            catchError((error: HttpErrorResponse) => {
                return throwError(error)
            })
        )
    }

}