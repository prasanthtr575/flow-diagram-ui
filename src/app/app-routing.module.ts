import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlowDiagramComponent } from './flow-diagram/flow-diagram.component';
import { DataModelDiagramComponent } from './data-model-diagram/data-model-diagram.component';
import { ProcessModelDiagramComponent } from './process-model-diagram/process-model-diagram.component';

const routes: Routes = [
  { path: '', redirectTo: '/demo', pathMatch: 'full' },
  { path: 'demo', component: FlowDiagramComponent },
  { path: 'data-model', component: DataModelDiagramComponent },
  { path: 'process-model', component: ProcessModelDiagramComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
