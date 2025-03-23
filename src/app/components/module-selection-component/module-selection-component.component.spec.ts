import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleSelectionComponentComponent } from './module-selection-component.component';

describe('ModuleSelectionComponentComponent', () => {
  let component: ModuleSelectionComponentComponent;
  let fixture: ComponentFixture<ModuleSelectionComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModuleSelectionComponentComponent]
    });
    fixture = TestBed.createComponent(ModuleSelectionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
