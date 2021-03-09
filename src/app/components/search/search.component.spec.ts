import { TestBed } from "@angular/core/testing"
import { AppModule } from "src/app/app.module"
import { SearchComponent } from "./search.component"

describe('SearchComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SearchComponent],
            imports: [AppModule]
        })
    })

    it('should create SearchComponent', () => {
        const fixture = TestBed.createComponent(SearchComponent);
        const component = fixture.componentInstance;
        expect(component).toBeDefined();
    })
})