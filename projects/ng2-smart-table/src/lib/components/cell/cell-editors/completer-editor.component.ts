import { Component, OnInit } from '@angular/core';

import { NgxTableCompleterService } from '../../completer/ngx-table-completer.service';

import { DefaultEditor } from './default-editor';

@Component({
  selector: 'completer-editor',
  template: `
    <ngst-smart-completer [(ngModel)]="completerStr"
                   [dataService]="cell.getColumn().getConfig().completer.dataService"
                   [minSearchLength]="cell.getColumn().getConfig().completer.minSearchLength || 0"
                   [pause]="cell.getColumn().getConfig().completer.pause || 0"
                   [placeholder]="cell.getColumn().getConfig().completer.placeholder || 'Start typing...'"
                   (selected)="onEditedCompleter($event)">
    </ngst-smart-completer>
    `,
})
export class CompleterEditorComponent extends DefaultEditor implements OnInit {

  completerStr = '';

  constructor(private completerService: NgxTableCompleterService) {
    super();
  }

  ngOnInit() {
    if (this.cell.getColumn().editor && this.cell.getColumn().editor.type === 'completer') {
      const config = this.cell.getColumn().getConfig().completer;
      config.dataService = this.completerService.local(config.data, config.searchFields, config.titleField);
      if (config.descriptionField) {
        config.dataService.descriptionField(config.descriptionField);
      }
    }
  }

  onEditedCompleter(event: { title: '' }): boolean {
    this.cell.newValue = event.title;
    return false;
  }
}
