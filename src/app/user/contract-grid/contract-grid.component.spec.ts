import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractGridComponent } from './contract-grid.component';

describe('ContractGridComponent', () => {
  let component: ContractGridComponent;
  let fixture: ComponentFixture<ContractGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
