import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionGridComponent } from './transaction-grid.component';
import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ScrollingModule, ScrollDispatcher } from '@angular/cdk/scrolling';
import { of } from 'rxjs';
import { ITransaction } from '../../interfaces/i-transaction';
import { reducers } from '../../store';


describe('TransactionGridComponent', () => {
  let component: TransactionGridComponent;
  let fixture: ComponentFixture<TransactionGridComponent>;
  var store : Store;
  var scrollDispatch : ScrollDispatcher;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [  
        StoreModule.forRoot({}),
        EffectsModule.forRoot(),
        StoreModule.forFeature('tezoState', reducers),
        ScrollingModule],
      declarations: [ TransactionGridComponent ]
    })
    .compileComponents();
    store = TestBed.get(Store);
    scrollDispatch = TestBed.get(ScrollDispatcher);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render transaction cdk scroll component', () => {
    spyOn(store, 'select').and.callFake((e)=>{return of([])});
    const fixture = TestBed.createComponent(TransactionGridComponent);    
    const compiled = fixture.nativeElement;
    expect(fixture.componentInstance.isLoaded).toBe(false);
    expect(compiled.innerHTML).toContain('cdk-virtual-scroll-viewport');
    expect(compiled.innerHTML).toContain('table');
    expect(fixture.componentInstance.transactions.length).toBe(0);
    fixture.detectChanges();
    expect(store.select).toHaveBeenCalled();
    expect(fixture.componentInstance.isLoaded).toBe(true);
    expect(compiled.innerHTML).toContain('cdk-virtual-scroll-viewport');
    expect(compiled.innerHTML).toContain('table');
    expect(fixture.componentInstance.transactions.length).toBe(0);
  });

  it('should render data from API', () => {
    spyOn(store, 'select').and.callFake((e)=>{return of([<ITransaction>{},<ITransaction>{}])});
    const fixture = TestBed.createComponent(TransactionGridComponent);    
    const compiled = fixture.nativeElement;
    expect(fixture.componentInstance.isLoaded).toBe(false);
    expect(compiled.innerHTML).toContain('cdk-virtual-scroll-viewport');
    expect(compiled.innerHTML).toContain('table');
    expect(fixture.componentInstance.transactions.length).toBe(0);
    fixture.detectChanges();
    expect(store.select).toHaveBeenCalled();
    expect(fixture.componentInstance.isLoaded).toBe(true);
    expect(compiled.innerHTML).toContain('cdk-virtual-scroll-viewport');
    expect(compiled.innerHTML).toContain('table');
    expect(fixture.componentInstance.transactions.length).toBe(2);
  });

  it('Should load additional data',()=>{
    spyOn(store, 'select').and.callFake((e)=>{return of([])});
    spyOn(store,'dispatch').and.callFake((e)=>{});
    spyOn(scrollDispatch,'scrolled').and.callFake((e)=>{return of()});
    
    const fixture = TestBed.createComponent(TransactionGridComponent);    
    const compiled = fixture.nativeElement;
    expect(fixture.componentInstance.isLoaded).toBe(false);
    expect(compiled.innerHTML).toContain('cdk-virtual-scroll-viewport');
    expect(compiled.innerHTML).toContain('table');
    expect(fixture.componentInstance.transactions.length).toBe(0);
    fixture.detectChanges();
    spyOn(fixture.componentInstance.virtualScroll, 'getRenderedRange').and.returnValue({end : 10, start : 1})
    spyOn(fixture.componentInstance.virtualScroll, 'getDataLength').and.returnValue(10);
    expect(store.select).toHaveBeenCalled();
    expect(fixture.componentInstance.isLoaded).toBe(true);
    fixture.componentInstance.ngAfterViewInit();
    fixture.detectChanges();
    expect(scrollDispatch.scrolled).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('Should not load additional data till user does not scroll down',()=>{
    spyOn(store, 'select').and.callFake((e)=>{return of([])});
    spyOn(store,'dispatch').and.callFake((e)=>{});
    spyOn(scrollDispatch,'scrolled').and.callFake((e)=>{return of()});
    
    const fixture = TestBed.createComponent(TransactionGridComponent);    
    const compiled = fixture.nativeElement;
    expect(fixture.componentInstance.isLoaded).toBe(false);
    expect(compiled.innerHTML).toContain('cdk-virtual-scroll-viewport');
    expect(compiled.innerHTML).toContain('table');
    expect(fixture.componentInstance.transactions.length).toBe(0);
    fixture.detectChanges();
    spyOn(fixture.componentInstance.virtualScroll, 'getRenderedRange').and.returnValue({end : 5, start : 1})
    spyOn(fixture.componentInstance.virtualScroll, 'getDataLength').and.returnValue(10);
    expect(store.select).toHaveBeenCalled();
    expect(fixture.componentInstance.isLoaded).toBe(true);
    fixture.componentInstance.ngAfterViewInit();
    fixture.detectChanges();
    expect(scrollDispatch.scrolled).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  })

});
