import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { NgstSmartCompleterComponent } from '../../completer/ngst-smart-completer.component';
import { NgxTableCompleterService } from '../../completer/ngx-table-completer.service';

import { CompleterFilterComponent } from './completer-filter.component';

describe('CompleterFilterComponent', () => {
  let fixture: ComponentFixture<CompleterFilterComponent>;
  let comp: CompleterFilterComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompleterFilterComponent],
      imports: [FormsModule, NgstSmartCompleterComponent],
      providers: [NgxTableCompleterService],
    }).compileComponents();

    fixture = TestBed.createComponent(CompleterFilterComponent);
    comp = fixture.componentInstance;
  });

  it('builds dataService from searchFields array and emits filter on selection', async () => {
    const completer = {
      data: [{ city: 'Paris' }],
      searchFields: ['city'],
      titleField: 'city',
    };
    comp.column = {
      id: 'city',
      getFilterConfig: () => ({ completer }),
    } as any;
    comp.delay = 0;
    vi.spyOn(comp.filter, 'emit').mockReturnValue(undefined);

    comp.ngOnInit();
    fixture.detectChanges();

    comp.completerContent.next({ title: 'Paris' });
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(comp.query).toBe('Paris');
    expect(comp.filter.emit).toHaveBeenCalled();
  });
});
