import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomBgComponent } from './random-bg.component';

describe('RandomBgComponent', () => {
  let component: RandomBgComponent;
  let fixture: ComponentFixture<RandomBgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomBgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RandomBgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
