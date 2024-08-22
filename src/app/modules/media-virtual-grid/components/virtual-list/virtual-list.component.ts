import { Component, ContentChildren, ElementRef, EventEmitter, Input, Output, QueryList, ViewChild } from '@angular/core';
import { VirtualListItemComponent } from '../virtual-list-item/virtual-list-item.component';

@Component({
  selector: 'app-virtual-list',
  templateUrl: './virtual-list.component.html',
  styleUrl: './virtual-list.component.scss'
})
export class VirtualListComponent {
  @ContentChildren(VirtualListItemComponent) items = new QueryList<VirtualListItemComponent>();
  @ViewChild('virtualListItem', { static: true }) listItemElement!: ElementRef;
  @Output() scrollEnd = new EventEmitter<boolean>()

  selector: string = ".virtual-list-container";
  @Input() itemWidth = '20px';
  @Input() itemHeight = '20px';

  onIntersection(status: boolean) {
    if (status) this.scrollEnd.emit(true);
  }
}
