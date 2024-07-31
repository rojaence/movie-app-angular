import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { LanguageOption } from '../../models/interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss',
})

export class AppHeaderComponent {
  title: string = "MovieApp";
  languages: LanguageOption[] = [
    {
      value: 'es',
      viewValue: 'ES - Español',
      viewValueShort: 'ES'
    },
    {
      value: 'en',
      viewValue: 'EN - English',
      viewValueShort: 'EN'
    }
  ];
  selectedLanguage = 'es';

  @Output() sideNavToggle = new EventEmitter<void>();
  @Output() searchBarToggle = new EventEmitter<void>();
}

