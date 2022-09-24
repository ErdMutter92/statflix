import { addFilterColumn, columnsVisible, removeFilterColumn } from '../table.actions';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { MatSelectChange } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { selectFitlers } from '../table.selectors';
import { take } from 'rxjs';
import { ColumnFilters } from 'src/app/types/page.state';

@Component({
  selector: 'app-column-filter',
  templateUrl: './column-filter.component.html',
  styleUrls: ['./column-filter.component.scss'],
})
export class ColumnFilterComponent implements OnInit {
  @Input()
  public options: string[] = [];

  @Input()
  public columnName?: string;

  @Input()
  public appearance: MatFormFieldAppearance = 'standard';

  public columnsControl = new FormControl('');

  constructor(private store: Store) {}

  public ngOnInit() {
    this.store
      .select(selectFitlers)
      .pipe(take(1))
      .subscribe((filters: any) => {
        if (this.columnName) {
          this.columnsControl.setValue(filters[this.columnName]);
        }
      });
  }

  public selectionOnChange({ value }: MatSelectChange) {
    if (this.columnName && value.length !== 0) {
      this.store.dispatch(addFilterColumn({ columnName: this.columnName, value }));
    } else if (this.columnName && value.length == 0) {
      this.store.dispatch(removeFilterColumn({ columnName: this.columnName }));
    }
  }
}
