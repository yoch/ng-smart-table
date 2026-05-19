import {
  Component,
  Type,
  ViewChild,
  ViewContainerRef,
  SimpleChanges,
  OnChanges,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { EditCellDefault } from './edit-cell-default';

@Component({
  selector: 'table-cell-custom-editor',
  template: `
    <ng-template #dynamicTarget></ng-template>
  `,
})
export class CustomEditComponent extends EditCellDefault implements OnChanges, OnDestroy {

  customComponent: any;
  private dynamicSubscriptions: Subscription[] = [];

  @ViewChild('dynamicTarget', { read: ViewContainerRef, static: true }) dynamicTarget: any;

  ngOnChanges(changes: SimpleChanges) {
    if (!this.cell) {
      return;
    }

    const compType = this.cell.getColumn().editor.component as Type<any>;
    if (this.customComponent) {
      const sameType = this.customComponent.componentType === compType;
      if (!sameType || changes['cell']) {
        this.destroyDynamicComponent();
      }
    }

    if (!this.customComponent) {
      this.createDynamicComponent(compType);
    }
  }

  ngOnDestroy() {
    this.destroyDynamicComponent();
  }

  private createDynamicComponent(compType: Type<any>) {
    this.customComponent = this.dynamicTarget.createComponent(compType);
    this.customComponent.instance.cell = this.cell;
    this.customComponent.instance.inputClass = this.inputClass;
    this.dynamicSubscriptions.push(
      this.customComponent.instance.onStopEditing.subscribe(() => this.onStopEditing()),
      this.customComponent.instance.onEdited.subscribe((event: any) => this.onEdited(event)),
      this.customComponent.instance.onClick.subscribe((event: any) => this.onClick(event)),
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
