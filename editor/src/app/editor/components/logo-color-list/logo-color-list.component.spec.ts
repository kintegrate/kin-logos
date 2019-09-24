import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoColorListComponent } from './logo-color-list.component';

describe('LogoColorListComponent', () => {
  let component: LogoColorListComponent;
  let fixture: ComponentFixture<LogoColorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoColorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoColorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
