import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataModelDiagramComponent } from './data-model-diagram.component';

describe('DataModelDiagramComponent', () => {
  let component: DataModelDiagramComponent;
  let fixture: ComponentFixture<DataModelDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataModelDiagramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataModelDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
