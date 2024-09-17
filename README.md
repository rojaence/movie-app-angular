# MovieAppAngular

## Overview

This app is a client for my [MovieAppApi](https://github.com/rojaence/MovieAppApi.git) project. An alternative version of [movie-app](https://github.com/rojaence/movie-app.git) (react) using Angular 17, SSR and @angular/localize to internationalization.

## Requirements

* Angular 17
* Angular Material 17
* @angular/ssr
* @angular/localize

## Installation

1. Clone the repository

   ```bash
   git clone https://github.com/rojaence/movie-app-angular.git
   ```
2. Install dependencies

   ```
   npm install
   ```
3. Configure environment files

   environment.ts

   ```typescript
   export const environment = {
     apiUrl: 'your_production_movieappapi_url',
     imageCdn: 'https://image.tmdb.org/t/p',
     thumbnailVideoBaseUrl: 'https://i.ytimg.com/vi',
     language: 'es',
     clientEnUrl: 'your_production_en_url',
     clientEsUrl: 'your_production_es_url'
   };

   ```

   Note: Review and adjust environment.es, environment.en and environment.development as appropriate. When run ng build,
4. Run serve (development)

   ```bash
   ng serve
   ```
5. Run build (production)

   When running the build, the respective settings for each language will be used.

   ```bash
   npm run build:all
   ```

   Then run prepare folders to deploy. (remove es-EC and en-US subfolders)

   ```bash
   npm run postbuild
   ```

   **Note:** To compile the application with ssr it is recommended to have the [movieAppApi](https://github.com/rojaence/MovieAppApi.git) project running in production.

## Demos

Deployment with Azure App Service

* Spanish Demo
* English Demo
