import { NgFor, NgIf } from '@angular/common';
import { Component, computed, EventEmitter, Input, OnChanges, Output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


interface IPaginatorItem {
  viewValue: string,
  value: number,
  type: 'page' | 'step'
}

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [NgFor, NgIf, MatButtonModule, MatIconModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent implements OnChanges {
  @Input() totalPages: number = 0
  @Input() currentPage: number = 1
  @Output() requestPage = new EventEmitter<number>()

  private _totalPages = signal(1);
  private _currentPage = signal(1);

  displayedPages = computed<IPaginatorItem[]>(() => {
    const total = this._totalPages();
    const current = this._currentPage();
    const maxPages = 7;
    let items: IPaginatorItem[] = [];

    const createPageItem = (value: number): IPaginatorItem => ({
      viewValue: value.toString(),
      value,
      type: 'page'
    });

    const createStepItem = (value: number): IPaginatorItem => ({
      viewValue: '...',
      value,
      type: 'step'
    });

    if (total <= maxPages) {
      items = Array.from({ length: total }, (_, i) => createPageItem(i + 1));
    } else {
      items.push(createPageItem(1));

      if (current <= 4) {
        items.push(
          createPageItem(2),
          createPageItem(3),
          createPageItem(4),
          createPageItem(5),
          createStepItem(6)
        );
      } else if (current >= total - 3) {
        items.push(
          createStepItem(total - 5),
          createPageItem(total - 4),
          createPageItem(total - 3),
          createPageItem(total - 2),
          createPageItem(total - 1)
        );
      } else {
        items.push(
          createStepItem(current - 2),
          createPageItem(current - 1),
          createPageItem(current),
          createPageItem(current + 1),
          createStepItem(current + 2)
        );
      }

      items.push(createPageItem(total));
    }

    return items;
  });

  ngOnChanges() {
    this._totalPages.set(this.totalPages);
    this._currentPage.set(this.currentPage);
  }

  prevPage() {
    this.updatePage(this._currentPage() - 1);
  }

  nextPage() {
    this.updatePage(this._currentPage() + 1);
  }

  updatePage(page: number) {
    if (page !== this.currentPage && page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this._currentPage.set(page);
      this.emitRequestPage()
    }
  }

  emitRequestPage() {
    this.requestPage.emit(this._currentPage())
  }

}
