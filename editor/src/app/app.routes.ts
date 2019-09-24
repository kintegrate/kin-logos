import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./editor/editor.module').then(m => m.EditorModule)
  }
];
