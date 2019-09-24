import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-logo-preview',
  template: `
    <div class="svg" [innerHTML]="cleanSvg"></div>
  `,
  encapsulation: ViewEncapsulation.None,
  styles: [`
    svg {
        width: 100%;
    }
  `]
})
export class LogoPreviewComponent implements OnInit {
  @Input() svg: string;

  public cleanSvg: SafeHtml;

  constructor(private sanitizer: DomSanitizer) { }


  ngOnInit() {
  }

  ngOnChanges() {
    console.log('Change LogoPreviewComponent')
    this.cleanSvg = this.sanitizer.bypassSecurityTrustHtml(this.svg);
  }

}
