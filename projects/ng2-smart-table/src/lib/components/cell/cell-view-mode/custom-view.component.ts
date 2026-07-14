import {
  Component,
  Input,
  Type,
  ViewChild,
  ViewContainerRef,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';

import { Cell } from '../../../lib/data-set/cell';
import { ViewCell } from './view-cell';

@Component({
  standalone: false,
  selector: 'custom-view-component',
  changeDetection: ChangeDetectionStrategy.Default,
  template: `
    <ng-template #dynamicTarget></ng-template>
  `,
})
export class CustomViewComponent implements OnInit, OnDestroy {

  customComponent: any;
  @Input() cell: Cell;
  @ViewChild('dynamicTarget', { read: ViewContainerRef, static: true }) dynamicTarget: any;

  ngOnInit() {
    if (this.cell && !this.customComponent) {
      this.createCustomComponent();
      this.callOnComponentInit();
      this.patchInstance();
    }
  }

  ngOnDestroy() {
    if (this.customComponent) {
      this.customComponent.destroy();
    }
  }

  protected createCustomComponent() {
    const compType = this.cell.getColumn().renderComponent as Type<any>;
    this.customComponent = this.dynamicTarget.createComponent(compType);
  }

  protected callOnComponentInit() {
    const onComponentInitFunction = this.cell.getColumn().getOnComponentInitFunction();
    onComponentInitFunction && onComponentInitFunction(this.customComponent.instance);
  }

  protected patchInstance() {
    Object.assign(this.customComponent.instance, this.getPatch());
  }

  protected getPatch(): ViewCell {
    return {
      value: this.cell.getValue(),
      rowData: this.cell.getRow().getData()
    }
  }
}
