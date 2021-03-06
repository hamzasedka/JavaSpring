import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProductComponent } from './select-product.component';

describe('SelectAddressComponent', () => {
  let component: SelectProductComponent;
  let fixture: ComponentFixture<SelectProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
