import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { Country } from "../interfaces/country.interface";

import {catchError} from "rxjs/operators";

@Injectable({providedIn: 'root'})

export class CountriesService {

    private _requestUrl: string = "https://restcountries.eu/rest/v2/";

    constructor(
        private _httpClient: HttpClient
    ) {}

    getByName(name: string): Observable<Country[]> {
        return this._httpClient.get<Country[]>(`${this._requestUrl}name/${name}`)
        .pipe(
            catchError((error: HttpErrorResponse) => {
                return throwError(error)
            })
        )
    }

}