import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { NgstSmartCompleterComponent } from './ngst-smart-completer.component';
import { SmartCompleterLocalDataSource } from './smart-completer-local.data-source';

describe('NgstSmartCompleterComponent', () => {
  let fixture: ComponentFixture<NgstSmartCompleterComponent>;
  let comp: NgstSmartCompleterComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgstSmartCompleterComponent, FormsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(NgstSmartCompleterComponent);
    comp = fixture.componentInstance;
    comp.dataService = new SmartCompleterLocalDataSource(
      [{ title: 'Alpha' }, { title: 'Beta' }],
      'title',
      'title',
    );
    comp.minSearchLength = 0;
    comp.pause = 0;
  });

  it('should list matches on input', async () => {
    fixture.detectChanges();
    await Promise.resolve(); // flush ngOnInit queueMicrotask
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    input.value = 'al';
    input.dispatchEvent(new Event('input'));
    (comp as any).onTextChange('al');
    await fixture.whenStable();
    expect(comp.items.length).toBe(1);
  });

  it('pick sets value and emits selected', () => {
    fixture.detectChanges();
    vi.spyOn(comp.selected, 'emit').mockReturnValue(undefined);
    const ev = new MouseEvent('mousedown');
    comp.pick({ title: 'Z' }, ev);
    expect(comp.text).toBe('Z');
    expect(comp.selected.emit).toHaveBeenCalled();
  });

  it('respects minSearchLength', async () => {
    comp.minSearchLength = 3;
    fixture.detectChanges();
    (comp as any).onTextChange('ab');
    await fixture.whenStable();
    expect(comp.items.length).toBe(0);
  });
});
