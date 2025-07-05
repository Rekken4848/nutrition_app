import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanFood } from './scan-food';

describe('ScanFood', () => {
  let component: ScanFood;
  let fixture: ComponentFixture<ScanFood>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScanFood]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScanFood);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
