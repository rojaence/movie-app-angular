import { afterNextRender, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LanguageOption } from '../../models/interfaces';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

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
      viewValueShort: 'ES',
      url: environment.clientEsUrl
    },
    {
      value: 'en',
      viewValue: 'EN - English',
      viewValueShort: 'EN',
      url: environment.clientEnUrl
    }
  ];
  selectedLanguage = 'es';

  constructor(private router: Router) {
    afterNextRender(() => {
      if (environment.language === 'es') this.selectedLanguage = 'es'
      else this.selectedLanguage = 'en'
    });
  }

  goToLang(url: string) {
    window.location.href = url;
  }

  @Output() sideNavToggle = new EventEmitter<void>();
  @Output() searchBarToggle = new EventEmitter<void>();
}

