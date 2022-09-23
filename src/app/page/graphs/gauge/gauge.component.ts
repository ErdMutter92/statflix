import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Color, ScaleType, LegendPosition } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.scss'],
})
export class GaugeComponent implements OnChanges {
  @Input()
  public data: { name: string; value: number }[] = [];

  @Input()
  public colors: string[] = [];

  @Input()
  public cardColor: string = '#40507a';

  public legend: boolean = true;
  public legendPosition: LegendPosition = LegendPosition.Right;

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
