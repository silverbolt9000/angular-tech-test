import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import {
  todoFeatureKey,
  todoReducer,
} from './examples/ngrx-todo/store/todo.reducer';

import { TodoEffects } from './examples/ngrx-todo/store/todo.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideEffects([
      TodoEffects,
    ]),
    provideStore({
      [todoFeatureKey]:
        todoReducer,
    }),
  ],
};
