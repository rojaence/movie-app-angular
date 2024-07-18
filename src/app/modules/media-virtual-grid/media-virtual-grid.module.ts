import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VirtualListComponent } from './components/virtual-list/virtual-list.component';
import { VirtualListItemComponent } from './components/virtual-list-item/virtual-list-item.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    VirtualListComponent,
    VirtualListItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    VirtualListComponent,
    VirtualListItemComponent
  ]
})
export class MediaVirtualGridModule { }
