import { Currency } from "./currency.interface";
import { Language } from "./language.interface";

export interface Country {
    name: string,
    currencies: Currency[],
    population: number,
    capital: string,
    alpha3Code: string,
    area?: number,
    gini?: number,
    flag?: string,
    languages?: Language[]
}