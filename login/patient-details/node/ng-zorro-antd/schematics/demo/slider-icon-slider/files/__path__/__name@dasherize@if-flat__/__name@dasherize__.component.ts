import { Component, OnInit } from '@angular/core';

@Component({
  selector: '<%= selector %>',
  <% if(inlineTemplate) { %>template: `
    <div class="icon-wrapper test-class">
      <i nz-icon type="frown" [class.icon-highlight]="preHighLight"></i>
      <nz-slider [nzMin]="0" [nzMax]="20" [(ngModel)]="sliderValue"></nz-slider>
      <i nz-icon type="smile" [class.icon-highlight]="nextHighLight"></i>
    </div>
  `<% } else { %>templateUrl: './<%= dasherize(name) %>.component.html'<% } %>,
  <% if(inlineStyle) { %>styles: [`
      .icon-wrapper {
        position: relative;
        padding: 0px 30px;
      }

      [nz-icon] {
        position: absolute;
        top: -2px;
        width: 16px;
        height: 16px;
        line-height: 1;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.25);
      }

      [nz-icon]:first-child {
        left: 0;
      }

      [nz-icon]:last-child {
        right: 0;
      }

      .icon-highlight {
        color: rgba(0, 0, 0, 0.45);
      }
    `]<% } else { %>styleUrls: ['./<%= dasherize(name) %>.component.<%= style %>']<% } %>
})
export class <%= classify(name) %>Component implements OnInit {
  min = 0;
  max = 20;
  mid = parseFloat(((this.max - this.min) / 2).toFixed(5));
  preHighLight = false;
  nextHighLight = false;
  _sliderValue = 0;

  set sliderValue(value: number) {
    this._sliderValue = value;
    this.highlightIcon();
  }

  get sliderValue(): number {
    return this._sliderValue;
  }

  ngOnInit(): void {
    this.sliderValue = 0;
  }

  highlightIcon() {
    const lower = this._sliderValue >= this.mid;
    this.preHighLight = !lower;
    this.nextHighLight = lower;
  }
}
