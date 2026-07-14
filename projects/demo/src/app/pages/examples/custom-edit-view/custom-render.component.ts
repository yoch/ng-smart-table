import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { ViewCell } from '@yoch/ng-smart-table';

@Component({
  standalone: false,
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    {{renderValue}}
  `,
})
export class CustomRenderComponent implements ViewCell, OnInit {

  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }

}
