import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import * as frmStore from '../../store';
import { ITransaction } from '../../interfaces/i-transaction';
import { CdkVirtualScrollViewport, ScrollDispatcher } from '@angular/cdk/scrolling';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'transaction-grid',
  templateUrl: './transaction-grid.component.html',
  styleUrls: ['./transaction-grid.component.scss']
})
export class TransactionGridComponent implements OnInit {

  transactions: ITransaction[];
  isLoaded: boolean = false;

  private lastRecordId: number = null;

  @ViewChild(CdkVirtualScrollViewport) virtualScroll: CdkVirtualScrollViewport;

  constructor(private store: Store<frmStore.TezoState>, private scrollDispatcher: ScrollDispatcher, private changeDet: ChangeDetectorRef) {
    this.transactions = <ITransaction[]>[];
  }

  ngOnInit(): void {
    this.store.select(frmStore.getAllTransations).subscribe((state) => {
      this.isLoaded = true;
      this.transactions = state;
      if (this.transactions && this.transactions.length > 0) {
        this.lastRecordId = this.transactions[this.transactions.length - 1].id;
      }
      this.changeDet.detectChanges();
    });
    this.store.dispatch(new frmStore.transactionLoad(this.lastRecordId))
  }

  ngAfterViewInit(): void {
    this.scrollDispatcher.scrolled().pipe(
      filter(event => this.virtualScroll.measureScrollOffset('bottom')===0)
    ).subscribe((event) => {
      this.store.dispatch(new frmStore.transactionLoad(this.lastRecordId));     
    })
  }
}
