import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameComponent } from './frame.component';

describe('FrameComponent', () => {
  let component: FrameComponent;
  let fixture: ComponentFixture<FrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'statflix'`, () => {
    const fixture = TestBed.createComponent(FrameComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('statflix');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(FrameComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('statflix app is running!');
  });
});
