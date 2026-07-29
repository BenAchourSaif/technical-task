import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Saif — Unity WebGL / Firebase',
  },
  {
    path: 'task-1-story-creation',
    loadComponent: () =>
      import('./pages/task1-story/task1-story.component').then((m) => m.Task1StoryComponent),
    title: 'Task 1 — Interactive Content Creation',
  },
  {
    path: 'task-2-search',
    loadComponent: () =>
      import('./pages/task2-search/task2-search.component').then((m) => m.Task2SearchComponent),
    title: 'Task 2 — Search & Content Discovery',
  },
  {
    path: 'architecture',
    loadComponent: () =>
      import('./pages/architecture/architecture.component').then((m) => m.ArchitectureComponent),
    title: 'Architecture',
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then((m) => m.AboutComponent),
    title: 'About & portfolio',
  },
  { path: '**', redirectTo: '' },
];
