import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionDefaultComponent } from './transaction-default.component';

describe('TransactionDefaultComponent', () => {
  let component: TransactionDefaultComponent;
  let fixture: ComponentFixture<TransactionDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render transaction grid', () => {
    const fixture = TestBed.createComponent(TransactionDefaultComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.innerHTML).toContain('transaction-grid');
  });
});
