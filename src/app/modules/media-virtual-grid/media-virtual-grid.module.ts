import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VirtualListComponent } from './components/virtual-list/virtual-list.component';
import { VirtualListItemComponent } from './components/virtual-list-item/virtual-list-item.component';
import { RouterModule } from '@angular/router';
import { AppObserveElementDirective } from '../../directives/app-observe-element.directive';

@NgModule({
  declarations: [
    VirtualListComponent,
    VirtualListItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppObserveElementDirective
  ],
  exports: [
    VirtualListComponent,
    VirtualListItemComponent
  ]
})
export class MediaVirtualGridModule { }
