import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {appConfig} from './app/app.config';

// Agent-js requires a polyfill 😕
// I've reported this issue multiple times. Hopefully, it will be addressed in the future.
// ERROR ReferenceError: global is not defined
(window as any).global = window;

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
