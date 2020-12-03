import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BodyImageCardComponent } from './body-image-card.component';

describe('BodyImageCardComponent', () => {
  let component: BodyImageCardComponent;
  let fixture: ComponentFixture<BodyImageCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyImageCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyImageCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
