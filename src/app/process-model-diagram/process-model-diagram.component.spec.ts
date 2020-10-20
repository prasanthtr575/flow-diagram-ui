import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessModelDiagramComponent } from './process-model-diagram.component';

describe('ProcessModelDiagramComponent', () => {
  let component: ProcessModelDiagramComponent;
  let fixture: ComponentFixture<ProcessModelDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessModelDiagramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessModelDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
