import { bootstrapApplication, platformBrowser } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

platformBrowserDynamic([

])
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
