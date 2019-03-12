import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovingLineComponent } from './moving-line.component';

describe('MovingLineComponent', () => {
  let component: MovingLineComponent;
  let fixture: ComponentFixture<MovingLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovingLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovingLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
