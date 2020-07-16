import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionDefaultComponent } from './components/transaction-default/transaction-default.component';
import { TransactionGridComponent } from './components/transaction-grid/transaction-grid.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store'
import{ reducers, TransactionEffects } from './store'
import { EffectsModule } from '@ngrx/effects';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TransactionFormatPipe } from './pipes/transaction-format.pipe';
import { AddressFormatPipe } from './pipes/address-format.pipe';

@NgModule({
  declarations: [TransactionDefaultComponent, TransactionGridComponent, TransactionFormatPipe, AddressFormatPipe],
  imports: [
    CommonModule,
    HttpClientModule,
    ScrollingModule,
    StoreModule.forFeature('tezoState', reducers),
    EffectsModule.forFeature([TransactionEffects])
  ],
  exports : [
    TransactionDefaultComponent
  ]
})
export class TransactionsModule { 
  static forRoot() : ModuleWithProviders{
    return {
      ngModule : TransactionsModule
    }
  }
}
