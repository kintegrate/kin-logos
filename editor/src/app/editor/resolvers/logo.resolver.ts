import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Logo } from '../types/logo';
import { EditorService } from '../services/editor.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root'})
export class LogoResolver implements Resolve<Logo[]> {

  constructor(private service: EditorService) {}

  resolve(): Observable<Logo[]> | Promise<Logo[]> | Logo[] {
    return this.service.fetchData()
  }
}
