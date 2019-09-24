import { Routes } from '@angular/router';
import { EditorIndexComponent } from './containers/editor-index/editor-index.component';
import { LogoResolver } from './resolvers/logo.resolver';

export const routes: Routes = [
  {
    path: '',
    component: EditorIndexComponent,
    resolve: { logos: LogoResolver }
  }
];
