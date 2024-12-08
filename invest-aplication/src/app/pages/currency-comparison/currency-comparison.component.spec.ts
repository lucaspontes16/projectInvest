import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyComparisonComponent } from './currency-comparison.component';

describe('CurrencyComparisonComponent', () => {
  let component: CurrencyComparisonComponent;
  let fixture: ComponentFixture<CurrencyComparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyComparisonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
