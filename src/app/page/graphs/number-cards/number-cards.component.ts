import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-number-cards',
  templateUrl: './number-cards.component.html',
  styleUrls: ['./number-cards.component.scss'],
})
export class NumberCardsComponent implements OnChanges {
  @Input()
  public data: { name: string; value: number }[] = [];

  @Input()
  public colors: string[] = [];

  @Input()
  public cardColor: string = '#40507a';

  public colorScheme: Color = {
    name: 'app-number-cards',
    selectable: false,
    group: ScaleType.Ordinal,
    domain: this.colors,
  };

  public ngOnChanges({ colors }: SimpleChanges) {
    if (colors) {
      this.colorScheme.domain = this.colors;
    }
  }
}
