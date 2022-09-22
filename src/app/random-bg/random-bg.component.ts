import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-random-bg',
  templateUrl: './random-bg.component.html',
  styleUrls: ['./random-bg.component.scss'],
})
export class RandomBgComponent implements OnInit {
  @Input()
  public assets: string[] = [];

  public backgroundStyle?: string;

  public ngOnInit() {
    const bgIndex = this.getRandomInteger(0, this.assets.length - 1);

    this.backgroundStyle = `background: url(${this.assets[bgIndex]});`;
  }

  private getRandomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
