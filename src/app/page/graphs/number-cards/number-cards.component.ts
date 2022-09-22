import { Component, Input } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-number-cards',
  templateUrl: './number-cards.component.html',
  styleUrls: ['./number-cards.component.scss']
})
export class NumberCardsComponent {
  @Input()
  public data: { name: string, value: number }[] = [];

  @Input()
  public colors: string[] = [];

  @Input()
  public cardColor: string = '#40507a';

  public colorScheme: Color = {
    name: 'app-number-cards',
    selectable: false,
    group: ScaleType.Ordinal,
    domain: this.colors,
  }
}
