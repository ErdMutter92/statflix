import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ColumnSelectorComponent } from './column-selector.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from '../table.module';
import { CommonPipesModule } from 'src/app/pipes/common-pipes.module';

@NgModule({
  declarations: [ColumnSelectorComponent],
  exports: [ColumnSelectorComponent],
  providers: [],
  imports: [
    CommonModule,
    CommonPipesModule,
    TableModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class ColumnSelectorTableModule {}
