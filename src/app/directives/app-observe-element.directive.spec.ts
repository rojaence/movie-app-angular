import { Component, ElementRef, ViewChild } from '@angular/core';
import { AppRepeatDirective } from './app-repeat.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MediaVirtualGridModule } from '../modules/media-virtual-grid/media-virtual-grid.module';

@Component({
  standalone: true,
  template: `
  <div>
    <app-virtual-list class="list" (scrollEnd)="onScrollEnd($event)" style="height: 400px; overflow-y: auto;" class="container-list">
      <app-virtual-list-item *appRepeat="2">
        <p>Example text</p>
      </app-virtual-list-item>
    </app-virtual-list>
  </div>
  `,
  imports: [MediaVirtualGridModule, AppRepeatDirective],
})
class TestComponent {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

  intersecting = false;
  onSrollEnd(ev: boolean) {
    this.intersecting = ev;
  }
}

describe('AppObserveElementDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent, CommonModule, BrowserAnimationsModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should true on intersecting last element', () => {

  });
});
