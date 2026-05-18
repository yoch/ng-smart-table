import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
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

  it('builds dataService from searchFields array and emits filter on selection', fakeAsync(() => {
    const completer = {
      data: [{ city: 'Paris' }],
      searchFields: ['city'],
      titleField: 'city',
    };
    comp.column = {
      id: 'city',
      getFilterConfig: () => ({ completer }),
    } as any;
    spyOn(comp.filter, 'emit');

    comp.ngOnInit();
    fixture.detectChanges();

    comp.completerContent.next({ title: 'Paris' });
    tick(400);
    expect(comp.query).toBe('Paris');
    expect(comp.filter.emit).toHaveBeenCalled();
  }));
});
