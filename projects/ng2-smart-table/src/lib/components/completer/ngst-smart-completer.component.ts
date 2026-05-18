import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { of, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, mergeMap } from 'rxjs/operators';

import { SmartCompleterLocalDataSource } from './smart-completer-local.data-source';

export type NgstSmartCompleterSelectedEvent = { title: string; originalObject?: any };

@Component({
  selector: 'ngst-smart-completer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgstSmartCompleterComponent),
      multi: true,
    },
  ],
  template: `
    <div class="ngst-completer">
      <input
        class="ngst-completer-input"
        type="text"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [ngModel]="text"
        (ngModelChange)="onTextChange($event)"
        (focus)="open = true"
        (blur)="onBlur()"
      />
      <ul class="ngst-completer-dropdown" *ngIf="open && items.length">
        <li
          *ngFor="let row of items"
          (mousedown)="pick(row, $event)"
          class="ngst-completer-item"
        >
          <span class="ngst-completer-title">{{ getTitle(row) }}</span>
          <span class="ngst-completer-desc" *ngIf="getDescription(row) as d">{{ d }}</span>
        </li>
      </ul>
    </div>
  `,
  styles: [
    `
      .ngst-completer {
        position: relative;
      }
      .ngst-completer-input {
        width: 100%;
        box-sizing: border-box;
      }
      .ngst-completer-dropdown {
        position: absolute;
        z-index: 50;
        left: 0;
        right: 0;
        margin: 0;
        padding: 0;
        list-style: none;
        border: 1px solid #ccc;
        max-height: 180px;
        overflow-y: auto;
        background: #fff;
      }
      .ngst-completer-item {
        padding: 4px 8px;
        cursor: pointer;
      }
      .ngst-completer-item:hover {
        background: #f0f0f0;
      }
      .ngst-completer-title {
        display: block;
      }
      .ngst-completer-desc {
        display: block;
        font-size: 0.85em;
        color: #666;
      }
    `,
  ],
})
export class NgstSmartCompleterComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  @Input() dataService!: SmartCompleterLocalDataSource;
  @Input() minSearchLength = 0;
  @Input() pause = 0;
  @Input() placeholder = '';

  @Output() readonly selected = new EventEmitter<NgstSmartCompleterSelectedEvent>();

  text = '';
  items: any[] = [];
  open = false;
  disabled = false;

  private readonly input$ = new Subject<string>();
  private sub?: Subscription;
  private onChange: (v: string) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  ngOnInit(): void {
    this.sub = this.input$
      .pipe(
        debounceTime(this.pause || 0),
        distinctUntilChanged(),
        mergeMap((term) => {
          if ((term?.length ?? 0) < this.minSearchLength) {
            this.items = [];
            return of([]);
          }
          if (!this.dataService) {
            this.items = [];
            return of([]);
          }
          return this.dataService.search(term);
        }),
      )
      .subscribe((rows) => {
        this.items = rows ?? [];
      });
    queueMicrotask(() => this.input$.next(this.text));
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.input$.complete();
  }

  writeValue(value: string | null): void {
    this.text = value ?? '';
  }

  registerOnChange(fn: (v: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onTextChange(value: string): void {
    this.text = value;
    this.open = true;
    this.onChange(value);
    this.input$.next(value);
  }

  pick(row: any, ev: MouseEvent): void {
    ev.preventDefault();
    if (!this.dataService) {
      return;
    }
    const title = this.dataService.getTitle(row);
    this.text = title;
    this.open = false;
    this.onChange(title);
    this.onTouched();
    this.selected.emit({ title, originalObject: row });
  }

  onBlur(): void {
    this.onTouched();
    setTimeout(() => (this.open = false), 150);
  }

  getTitle(row: any): string {
    return this.dataService?.getTitle(row) ?? '';
  }

  getDescription(row: any): string {
    const d = this.dataService?.getDescription(row);
    return d ? String(d) : '';
  }
}
