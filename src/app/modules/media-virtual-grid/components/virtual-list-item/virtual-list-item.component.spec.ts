import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualListItemComponent } from './virtual-list-item.component';

describe('VirtualListItemComponent', () => {
  let component: VirtualListItemComponent;
  let fixture: ComponentFixture<VirtualListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VirtualListItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VirtualListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
