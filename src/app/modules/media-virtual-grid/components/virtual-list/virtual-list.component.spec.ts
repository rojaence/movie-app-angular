import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualListComponent } from './virtual-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('VirtualListComponent', () => {
  let component: VirtualListComponent;
  let fixture: ComponentFixture<VirtualListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VirtualListComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VirtualListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
