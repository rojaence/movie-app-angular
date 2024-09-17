import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatRippleModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { LayoutModule } from '@angular/cdk/layout';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MediaDetailsComponent } from './pages/media-details/media-details.component';
import { languageInterceptor } from './interceptors/LanguageInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppFooterComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    LayoutModule,
    MatRippleModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatSidenavModule,
    SearchBarComponent,
    MediaDetailsComponent
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(
      withFetch(),
      withInterceptors([languageInterceptor])
    )
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
