import { Injectable } from '@angular/core';

import { SmartCompleterLocalDataSource } from './smart-completer-local.data-source';

@Injectable({ providedIn: 'root' })
export class NgxTableCompleterService {
  local(
    data: any[],
    searchFields: string | string[] | null | undefined,
    titleField: string,
  ): SmartCompleterLocalDataSource {
    return new SmartCompleterLocalDataSource(data ?? [], searchFields, titleField);
  }
}
