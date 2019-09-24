import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Logo } from '../../types/logo';

@Component({
  selector: 'app-logo-details',
  template: `
    <div class="card">
      <div class="card-header">{{ logo.name }}</div>
      <div class="card-body">
        <div class="row">
          <div class="col-4">
            <app-logo-preview *ngIf="svg" [svg]="svg"></app-logo-preview>
          </div>
          <div class="col-4">
            <app-logo-color-list [label]="label" [colors]="logo.colors" (action)="handleAction($event)"></app-logo-color-list>
          </div>
          <div class="col-4">
            <app-logo-color-picker [color]="color" [label]="label" (action)="handleAction($event)"></app-logo-color-picker>
          </div>
        </div>
      </div>
      <div class="card-header">Object</div>
      <pre>{{ logo | json }}</pre>
    </div>
  `,
})
export class LogoDetailsComponent implements OnInit {
  @Input() logo: Logo;
  @Input() label: string;
  @Input() color: string;
  @Output() action = new EventEmitter();
  public svg: string

  ngOnInit(): void {
    this.svg = this.logo.source;
  }

  handleAction({ type, payload}) {
    const { label, color } = payload;
    switch (type) {
      case 'SELECT_COLOR':
        this.label = label;
        this.color = color;
        break;
      case 'UPDATE_COLOR':
        if (color) {
          this.logo = {...this.logo, colors: { ...this.logo.colors, [label]: color }};
          this.svg = this.generateSvg(this.logo);
        }
        return;
    }
  }

  private generateSvg(logo: Logo) {
    const colors = Object.keys(logo.colors)
      .map(label => ({ label, color: logo.colors[label]}))

    // Get the original source
    let newSvg = logo.originalSource;
    // Loop over the color scheme and search/replace labels with new colors
    colors.forEach(color => {
      newSvg = newSvg.replace(new RegExp(color.label, 'g'), color.color)
    })
    return newSvg
  }

}
