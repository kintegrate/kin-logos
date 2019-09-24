import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'

import { InlineSVGModule } from 'ng-inline-svg';
import { ColorPickerModule } from 'ngx-color-picker';

import { routes } from './editor.routes';

import { EditorIndexComponent } from './containers/editor-index/editor-index.component';
import { LogoPreviewComponent } from './components/logo-preview/logo-preview.component';
import { LogoDetailsComponent } from './components/logo-details/logo-details.component';
import { LogoColorPickerComponent } from './components/logo-color-picker/logo-color-picker.component';
import { LogoColorListComponent } from './components/logo-color-list/logo-color-list.component';

@NgModule({
  declarations: [EditorIndexComponent, LogoPreviewComponent, LogoDetailsComponent, LogoColorPickerComponent, LogoColorListComponent],
  imports: [
    CommonModule,
    FormsModule,
    InlineSVGModule,
    ColorPickerModule,
    RouterModule.forChild(routes)
  ]
})
export class EditorModule { }
