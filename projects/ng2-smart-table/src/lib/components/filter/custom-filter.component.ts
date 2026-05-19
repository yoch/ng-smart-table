import {
  Component,
  Type,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { FilterDefault } from './filter-default';

@Component({
  selector: 'custom-table-filter',
  template: `<ng-template #dynamicTarget></ng-template>`,
})
export class CustomFilterComponent extends FilterDefault implements OnChanges, OnDestroy {
  customComponent: any;
  private dynamicSubscriptions: Subscription[] = [];

  @ViewChild('dynamicTarget', { read: ViewContainerRef, static: true }) dynamicTarget: any;

  ngOnChanges(changes: SimpleChanges) {
    if (!this.column) {
      return;
    }

    const compType = this.column.filter.component as Type<any>;
    if (this.customComponent) {
      const sameType = this.customComponent.componentType === compType;
      if (!sameType || changes['column']) {
        this.destroyDynamicComponent();
      }
    }

    if (!this.customComponent) {
      this.createDynamicComponent(compType);
    }

    if (this.customComponent) {
      const inst = this.customComponent.instance;
      inst.query = this.query;
      inst.column = this.column;
      inst.source = this.source;
      inst.inputClass = this.inputClass;
      if (typeof inst?.ngOnChanges === 'function') {
        inst.ngOnChanges(changes);
      }
    }
  }

  ngOnDestroy() {
    this.destroyDynamicComponent();
  }

  private createDynamicComponent(compType: Type<any>) {
    this.customComponent = this.dynamicTarget.createComponent(compType);
    this.customComponent.instance.query = this.query;
    this.customComponent.instance.column = this.column;
    this.customComponent.instance.source = this.source;
    this.customComponent.instance.inputClass = this.inputClass;
    this.dynamicSubscriptions.push(
      this.customComponent.instance.filter.subscribe((event: any) => this.onFilter(event)),
    );
  }

  private destroyDynamicComponent() {
    this.dynamicSubscriptions.forEach((s) => s.unsubscribe());
    this.dynamicSubscriptions = [];
    if (this.customComponent) {
      this.customComponent.destroy();
      this.customComponent = null;
    }
  }
}
