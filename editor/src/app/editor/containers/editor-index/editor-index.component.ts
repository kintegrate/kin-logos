import { Component, OnInit } from '@angular/core';
import { EditorService } from '../../services/editor.service';
import { Logo } from '../../types/logo';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editor-index',
  template: `
    <div class="row" style="height: 95vh">
      <div class="col-md-3" style="height: 95vh; overflow: auto;">
        <ng-container *ngFor="let item of service.logos">
          <span class="logo-wrapper" [style.background]="logo === item ? 'black': ''">
            <a href="" [routerLink]="'.'" [queryParams]="{ logo: item.name }" >
              <img class="small-logo" [attr.src]="'https://kintegrate.github.io/kin-logos/' + item.png" />
            </a>
          </span>
        </ng-container>
      </div>
      <div class="col-md-9">
        <app-logo-details *ngIf="logo" [logo]="logo" [color]="color" [label]="label"></app-logo-details>
        <div *ngIf="!logo">
          <div class="alert alert-info">Select a logo</div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .list-group-item {
        cursor: pointer;
    }
    .logo-wrapper {
        display: inline-block;
        padding: 3px;
        text-align: center;
    }
    .small-logo {
        height: 30px;
    }
  `]
})
export class EditorIndexComponent implements OnInit {
  logo: Logo;
  color: string;
  label: string;

  constructor(
    public route: ActivatedRoute,
    public service: EditorService,
  ) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.color = params.color || '';
        this.label = params.label || '';
        this.selectLogo(this.service.logos.find(item => item.name === params.logo));
      });
  }

  selectLogo(logo: Logo) {
    this.logo = null;
    setTimeout(() => {
      this.logo = logo;
    }, 0);
  }
}
