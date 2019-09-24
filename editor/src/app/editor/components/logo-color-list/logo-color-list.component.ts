import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-logo-color-list',
  template: `
    <span *ngFor="let color of getColors()">
<!--      <a [routerLink]="'.'" [queryParams]="{ color: color.value, label: color.label }" queryParamsHandling="merge"-->
      <button (click)="selectColor({ color: color.value, label: color.label })"
         [style.font-weight]="color.label === label ? 'bold': ''"
         [style.background-color]="color.value" style="display: inline-block; color: black;" class="p-1 m-1">
        {{ color.label }}
      </button>
    </span>
  `,
})
export class LogoColorListComponent {
  @Input() label: string;
  @Input() colors: { [key: string]: string };
  @Output() action = new EventEmitter();

  getColors() {
    return Object.keys(this.colors)
      .map(color => ({ label: color, value: this.colors[color] }));
  }

  selectColor(color) {
    this.action.emit({ type: 'SELECT_COLOR', payload: { ...color }});
  }
}
