import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdertrackingdetailsComponent } from './ordertrackingdetails.component';

describe('OrdertrackingdetailsComponent', () => {
  let component: OrdertrackingdetailsComponent;
  let fixture: ComponentFixture<OrdertrackingdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdertrackingdetailsComponent]
    });
    fixture = TestBed.createComponent(OrdertrackingdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
