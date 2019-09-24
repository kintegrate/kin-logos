import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Logo } from '../types/logo';
import { environment } from '../../../environments/environment'

@Injectable({ providedIn: 'root' })
export class EditorService {
  logos: Logo[] = [];

  constructor(private http: HttpClient) {}

  fetchData() {
    return this.http.get<Logo[]>(`${environment.siteUrl}/json/logos.json`)
      .pipe(tap((data) => this.logos = data));
  }

}
