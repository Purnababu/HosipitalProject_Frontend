import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeResultComponent } from './employe-result.component';

describe('EmployeResultComponent', () => {
  let component: EmployeResultComponent;
  let fixture: ComponentFixture<EmployeResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeResultComponent]
    });
    fixture = TestBed.createComponent(EmployeResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
