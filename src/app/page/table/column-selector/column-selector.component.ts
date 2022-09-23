import { columnsVisible } from '../table.actions';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { MatSelectChange } from '@angular/material/select';
import { selectAvailableColumns, selectDisplayedColumns } from '../table.selectors';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';

@Component({
  selector: 'app-column-selector',
  templateUrl: './column-selector.component.html',
  styleUrls: ['./column-selector.component.scss'],
})
export class ColumnSelectorComponent implements OnInit {
  public displayedColumns = this.store.select(selectDisplayedColumns);
  public options = this.store.select(selectAvailableColumns);

  @Input()
  public appearance: MatFormFieldAppearance = 'standard';

  public columnsControl = new FormControl('');

  constructor(private store: Store) {}

  public ngOnInit() {
    this.displayedColumns.pipe(take(1)).subscribe((selected) => {
      this.columnsControl.setValue(selected as any);
    });
  }

  selectionOnChange({ value }: MatSelectChange) {
    this.store.dispatch(columnsVisible({ displayedColumns: value }));
  }
}
