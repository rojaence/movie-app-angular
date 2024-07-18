import { AfterViewInit, Component, ContentChildren, QueryList } from '@angular/core';
import { VirtualListItemComponent } from '../virtual-list-item/virtual-list-item.component';

@Component({
  selector: 'app-virtual-list',
  templateUrl: './virtual-list.component.html',
  styleUrl: './virtual-list.component.scss'
})
export class VirtualListComponent implements AfterViewInit {
  @ContentChildren(VirtualListItemComponent) items = new QueryList<VirtualListItemComponent>();

  ngAfterViewInit(): void {
    // TODO: capturar eventos para scroll infinito

  }
}
