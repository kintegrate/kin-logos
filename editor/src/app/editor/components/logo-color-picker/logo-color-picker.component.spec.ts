import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoColorPickerComponent } from './logo-form.component';

describe('LogoFormComponent', () => {
  let component: LogoColorPickerComponent;
  let fixture: ComponentFixture<LogoColorPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoColorPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
