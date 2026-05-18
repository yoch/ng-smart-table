import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { NgstSmartCompleterComponent } from '../../completer/ngst-smart-completer.component';
import { NgxTableCompleterService } from '../../completer/ngx-table-completer.service';

import { CompleterEditorComponent } from './completer-editor.component';

describe('CompleterEditorComponent', () => {
  let fixture: ComponentFixture<CompleterEditorComponent>;
  let comp: CompleterEditorComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompleterEditorComponent],
      imports: [FormsModule, NgstSmartCompleterComponent],
      providers: [NgxTableCompleterService],
    }).compileComponents();

    fixture = TestBed.createComponent(CompleterEditorComponent);
    comp = fixture.componentInstance;
  });

  it('initializes dataService from legacy searchFields string', () => {
    const completer: {
      data: { name: string; mail: string }[];
      searchFields: string;
      titleField: string;
      dataService?: unknown;
    } = {
      data: [{ name: 'Ann', mail: 'a@b.c' }],
      searchFields: 'name,mail',
      titleField: 'name',
    };
    comp.cell = {
      getColumn: () => ({
        editor: { type: 'completer' },
        getConfig: () => ({ completer }),
      }),
    } as any;

    comp.ngOnInit();
    expect(completer.dataService).toBeTruthy();
    fixture.detectChanges();
    comp.onEditedCompleter({ title: 'Ann' } as any);
    expect(comp.cell.newValue).toBe('Ann');
  });
});
