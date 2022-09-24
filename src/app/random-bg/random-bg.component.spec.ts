import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomBgComponent } from './random-bg.component';

describe('RandomBgComponent', () => {
  let component: RandomBgComponent;
  let fixture: ComponentFixture<RandomBgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RandomBgComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RandomBgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default assets (default: [])', () => {
    expect(component.assets).toEqual([]);
  });

  describe('ngOnInit', () => {
    it('should set backgroundStyle with random asset value', () => {
      spyOn(component as any, 'getRandomInteger').and.returnValue(1);
      component.assets = ['0', '1', '2', '3', '4'];
      fixture.detectChanges();

      component.ngOnInit();

      expect((component as any).getRandomInteger).toHaveBeenCalledWith(0, 4);
      expect(component.backgroundStyle).toBe('background: url(1);');
    });

    it('should pick an asset within the assets array', () => {
      spyOn(component as any, 'getRandomInteger').and.callThrough();
      component.assets = ['0', '1', '2', '3', '4'];
      fixture.detectChanges();

      component.ngOnInit();

      const randomIndex = (component as any).backgroundStyle.charAt(16);

      expect(component.assets).toContain(randomIndex);
    });
  });
});
