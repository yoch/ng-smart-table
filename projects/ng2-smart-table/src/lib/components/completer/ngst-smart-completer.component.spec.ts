import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
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

  it('should list matches on input', fakeAsync(() => {
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    input.value = 'al';
    input.dispatchEvent(new Event('input'));
    (comp as any).onTextChange('al');
    tick(0);
    fixture.detectChanges();
    expect(comp.items.length).toBe(1);
  }));

  it('pick sets value and emits selected', fakeAsync(() => {
    fixture.detectChanges();
    spyOn(comp.selected, 'emit');
    const ev = new MouseEvent('mousedown');
    comp.pick({ title: 'Z' }, ev);
    expect(comp.text).toBe('Z');
    expect(comp.selected.emit).toHaveBeenCalled();
    tick(200);
  }));

  it('respects minSearchLength', fakeAsync(() => {
    comp.minSearchLength = 3;
    fixture.detectChanges();
    (comp as any).onTextChange('ab');
    tick(0);
    expect(comp.items.length).toBe(0);
  }));
});
