import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ToolbarActionsComponent } from './toolbar-actions.component';

describe('ToolbarActionsComponent', () => {
  let component: ToolbarActionsComponent;
  let fixture: ComponentFixture<ToolbarActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolbarActionsComponent ],
      imports: [ NoopAnimationsModule, MatInputModule, MatIconModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolbarActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should clear search upon clicking clear action', () => {});
  xit('should open filter drawer when action button clicked', () => {});
  xit('should open visibility drawer when action button clicked', () => {});
});
