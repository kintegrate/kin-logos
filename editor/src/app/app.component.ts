import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container-fluid py-3" style="height: 100vh">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {}
