import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyScale } from './body-scale';

describe('BodyScale', () => {
  let component: BodyScale;
  let fixture: ComponentFixture<BodyScale>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BodyScale]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodyScale);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
