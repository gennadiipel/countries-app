import { Currency } from "./currency.interface";

export interface Country {
    name: string,
    currencies: Currency[],
    population: number,
    capital: string
}