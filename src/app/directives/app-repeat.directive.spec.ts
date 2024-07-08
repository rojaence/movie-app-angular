import { Component } from '@angular/core';
import { AppRepeatDirective } from './app-repeat.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: '<div *appRepeat="3">Hello</div>'
})
class TestComponent {}

describe('AppRepeatDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppRepeatDirective],
      declarations: [TestComponent]
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  })

  it('should repeat the element 3 times', () => {
    const debugElements = fixture.debugElement.queryAll(By.css('div'));
    expect(debugElements.length).toBe(3);
    debugElements.forEach(de => {
      expect(de.nativeElement.textContent).toContain('Hello');
    });
  });
});
