import { EMPTY, of, throwError } from "rxjs"
import { Country } from "src/app/interfaces/country.interface"
import { CountriesService } from "src/app/services/countries.service"
import { SearchComponent } from "./search.component"

describe('SearchComponent', () => {

    let component: SearchComponent
    let service: CountriesService
    const sampleCountry: Country = {
        name: 'Russia',
        population: 1,
        currencies: [],
        alpha3Code: 'RUS',
        capital: 'Moscow',

    }

    const sampleInputValue = { target: { value: 'Sample value' } }
    const sampleEmptyInputValue = { target: { value: '' } }

    beforeEach(() => {
        service = new CountriesService(null)
        component = new SearchComponent(service)
    })

    it('should create SearchComponent', () => {
        expect(component).toBeDefined()
    })

    it('should #countries be [] before getting response from the server', () => {
        expect(component.countries).toEqual([]);
    })

    it('should call #getByName in #search', () => {
        const spy = spyOn(service, 'getByName').and.callFake(() => {
            return EMPTY
        })

        component.search(sampleInputValue)

        expect(spy).toHaveBeenCalled()
    })

    it('should set #countries to [] in #search if error', () => {
        
        component.countries = [sampleCountry, sampleCountry]
        
        spyOn(service, 'getByName').and.callFake(() => {
            return throwError(null)
        })

        component.search(sampleInputValue)

        expect(component.countries).toEqual([])
        
    })

    it('should set #countries after #search called', () => {
        spyOn(service, 'getByName').and.callFake(() => {
            return of([sampleCountry, sampleCountry])
        })
        component.search({target: {value: 'sample string'}})
        expect(component.countries.length).toEqual(2)
        
    })

    it('should return #countries after #returnResults called', () => {
        let result:Country[] = null

        component.onSearchButtonClicked.subscribe(r => result = r)

        component.returnResults()

        expect(result).toEqual([])

    })

    it('should set #countries to [] if search query is empty', () => {
        component.countries = [sampleCountry, sampleCountry]
        
        component.search(sampleEmptyInputValue)
        
        expect(component.countries).toEqual([])

    })

    it('#search should return null if search query is empty', () => {
        component.countries = [sampleCountry, sampleCountry]
        
        const result = component.search(sampleEmptyInputValue)
        
        expect(result).toEqual(null)

    })

    it('should unsubscribe from #searchSubscription if it != null', () => {
        component.countries = [sampleCountry, sampleCountry]
        
        const result = component.search(sampleEmptyInputValue)
        
        expect(result).toEqual(null)

    })
})