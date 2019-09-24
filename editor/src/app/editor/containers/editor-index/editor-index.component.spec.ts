import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorIndexComponent } from './editor-index.component';

describe('EditorIndexComponent', () => {
  let component: EditorIndexComponent;
  let fixture: ComponentFixture<EditorIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
