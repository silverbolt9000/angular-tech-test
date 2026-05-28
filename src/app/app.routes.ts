import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import(
        './layout/main-layout/main-layout'
      ).then(
        (m) => m.MainLayout
      ),

    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './features/users/pages/users-page/users-page'
          ).then(
            (m) =>
              m.UsersPageComponent
          ),
      },

      {
        path: 'examples/rxjs-search',
        loadComponent: () =>
          import(
            './examples/rxjs-search/components/reactive-search/reactive-search'
          ).then(
            (m) =>
              m.ReactiveSearchComponent
          ),
      },

      {
        path: 'examples/signals-cart',
        loadComponent: () =>
          import(
            './examples/signals-cart/components/signals-cart/signals-cart'
          ).then(
            (m) =>
              m.SignalsCartComponent
          ),
      },
      {
        path: 'examples/ngrx-todo',
        loadComponent: () =>
          import(
            './examples/ngrx-todo/components/ngrx-todo/ngrx-todo'
          ).then(
            (m) =>
              m.NgrxTodoComponent
          ),
      },
      {
        path: 'examples/change-detection',
        loadComponent: () =>
          import(
            './examples/change-detection/components/change-detection/change-detection'
          ).then(
            (m) =>
              m.ChangeDetectionComponent
          ),
      },
      {
        path: 'examples/performance',
        loadComponent: () =>
          import(
            './examples/performance/components/performance/performance'
          ).then(
            (m) =>
              m.PerformanceDemoComponent
          ),
      },
      {
        path: 'examples/refactor',
        loadComponent: () =>
          import(
            './examples/refactor/components/refactor/refactor'
          ).then(
            (m) =>
              m.TsRefactoringComponent
          ),
      },
      {
        path: 'examples/generics',
        loadComponent: () =>
          import(
            './examples/generics/components/generics/generics'
          ).then(
            (m) =>
              m.GenericsDemoComponent
          ),
      }
    ],
  },
];
