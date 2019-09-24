import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core'
import { BehaviorSubject, fromEvent, Observable, Subscription } from 'rxjs'
import { throttleTime } from 'rxjs/operators'

@Component({
  selector: 'app-logo-color-picker',
  template: `
    <div *ngIf="!color"><div class="alert alert-info">Select Color</div></div>
    <div *ngIf="color">
      <div
        class="p-3"
        [style.background-color]="color"
        [style.color]="'black'"
        cpAlphaChannel="disabled"
        [cpPosition]="'bottom'"
        [cpPositionOffset]="'50%'"
        [cpPositionRelativeToArrow]="true"
        [(colorPicker)]="color"
        (colorPickerChange)="updateColor($event)"
      >
        <h4 class="text-center">{{ label }}</h4>
        <h4 class="text-center">{{ color.toUpperCase() }}</h4>
      </div>
    </div>
  `,
})
export class LogoColorPickerComponent implements OnInit {
  @Input() color: string
  @Input() label: string
  @Output() action = new EventEmitter()
  private sub$: Subscription
  private color$ = new BehaviorSubject<string>('')
  private throttleDelay = 300

  ngOnInit(): void {
    this.sub$ = this.color$
      .asObservable()
      .pipe(throttleTime(this.throttleDelay))
      .subscribe(color => this.emitColor(color))
  }

  emitColor(color) {
    this.action.emit({ type: 'UPDATE_COLOR', payload: { label: this.label, color } })
  }

  updateColor(color) {
    this.color$.next(color)
  }

  reset(color: string) {
    this.color = color
  }

  ngOnDestroy() {
    if (this.sub$) {
      this.sub$.unsubscribe()
    }
  }
}
