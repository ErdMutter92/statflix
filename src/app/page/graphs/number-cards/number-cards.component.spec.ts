import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';

import { NumberCardsComponent } from './number-cards.component';

describe('NumberCardsComponent', () => {
  let component: NumberCardsComponent;
  let fixture: ComponentFixture<NumberCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NumberCardsComponent],
      imports: [NgxChartsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(NumberCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should default data (default: [])', () => {
    expect(component.data).toBeDefined();
    expect(component.data).toEqual([]);
  });

  it('should default colors (default: [])', () => {
    expect(component.colors).toBeDefined();
    expect(component.colors).toEqual([]);
  });

  it('should default cardColor (default: #40507a)', () => {
    expect(component.cardColor).toBeDefined();
    expect(component.cardColor).toBe('#40507a');
  });
  
  it('should use updated colors in colorSchema', () => {
    component.colors = ['red', 'blue', 'green', 'yellow'];
    component.ngOnChanges({ colors: true } as any); // smug on change event
    fixture.detectChanges();

    expect(component.colorScheme).toEqual({
      name: jasmine.any(String),
      selectable: jasmine.any(Boolean),
      group: ScaleType.Ordinal,
      domain: component.colors
    });
  });
});
