import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalDataSource } from './lib/data-source/local/local.data-source';
import { Ng2SmartTableModule } from './ng2-smart-table.module';
import { Ng2SmartTableComponent } from './ng2-smart-table.component';

describe('Ng2SmartTableComponent', () => {
  let fixture: ComponentFixture<Ng2SmartTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ng2SmartTableModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Ng2SmartTableComponent);
  });

  it('should create with LocalDataSource', () => {
    fixture.componentInstance.settings = {
      columns: { id: { title: 'ID' } },
    };
    fixture.componentInstance.source = new LocalDataSource([{ id: 1 }]);
    expect(fixture.componentInstance).toBeTruthy();
  });

});
