import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import {FormsModule} from '@angular/forms';
import { slideDownAnimation } from './search-bar.animations';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, FormsModule, MatToolbar],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  animations: [slideDownAnimation]
})
export class SearchBarComponent {
  @Input() isOpen = false;
  @Output() toggle: EventEmitter<void> = new EventEmitter<void>();

  @HostListener('document:keydown.escape', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.isOpen && event.key === 'Escape') {
      this.toggle.emit();
    }
  }
}
