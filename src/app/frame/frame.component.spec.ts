import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonPipesModule } from '../pipes/common-pipes.module';

import { FrameComponent } from './frame.component';

describe('FrameComponent', () => {
  let component: FrameComponent;
  let fixture: ComponentFixture<FrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrameComponent],
      imports: [CommonPipesModule, MatToolbarModule, RouterTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have a title 'statflix'`, () => {
    const fixture = TestBed.createComponent(FrameComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('statflix');
  });

  it(`should display a title 'Statflix'`, () => {
    const fixture = TestBed.createComponent(FrameComponent);
    fixture.detectChanges();
    const toolbarTitle = fixture.nativeElement.querySelector('.mat-toolbar > span');

    expect(toolbarTitle.textContent).toContain('Statflix');
  });
});
