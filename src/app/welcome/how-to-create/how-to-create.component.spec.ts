import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToCreateComponent } from './how-to-create.component';

describe('HowToCreateComponent', () => {
  let component: HowToCreateComponent;
  let fixture: ComponentFixture<HowToCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HowToCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HowToCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
