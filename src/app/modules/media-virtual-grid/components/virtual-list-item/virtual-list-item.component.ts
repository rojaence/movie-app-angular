import { Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-virtual-list-item',
  templateUrl: './virtual-list-item.component.html',
  styleUrl: './virtual-list-item.component.scss'
})
export class VirtualListItemComponent {
  @ViewChild('template', {static: true}) template!: TemplateRef<HTMLElement>
}
