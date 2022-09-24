import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { toggleTableSettings } from '../table.actions';

@Component({
  selector: 'app-toolbar-actions',
  templateUrl: './toolbar-actions.component.html',
  styleUrls: ['./toolbar-actions.component.scss'],
})
export class ToolbarActionsComponent {
  constructor(private store: Store) {}

  toggleTableSettings() {
    this.store.dispatch(toggleTableSettings());
  }
}
