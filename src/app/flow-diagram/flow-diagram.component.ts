import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { DataSyncService, DiagramComponent } from 'gojs-angular';
import * as go from 'gojs';

@Component({
  selector: 'flow-diagram',
  templateUrl: './flow-diagram.component.html',
  styleUrls: ['./flow-diagram.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FlowDiagramComponent {
  public initDiagram(): go.Diagram {
    const $ = go.GraphObject.make;

    const dia = $(go.Diagram, {
      'undoManager.isEnabled': true, // must be set to allow for model change listening
      // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
      layout: $(go.TreeLayout, // specify a Diagram.layout that arranges trees
        { angle: 90, layerSpacing: 35 }
      ),
      model: $(go.TreeModel)
    });

    // define the Node template
    dia.nodeTemplate = $(go.Node,
      "Horizontal",
      { background: "#44CCFF" },
      $(go.Picture,
        { margin: 10, width: 50, height: 50, background: "red" },
        new go.Binding("source")
      ),
      $(go.TextBlock,
        "Default Text",
        { margin: 12, stroke: "white", font: "bold 16px sans-serif" },
        new go.Binding("text", "name")
      )
    );

    return dia;
  }

  public diagramNodeData = [
    { key: "1", name: "Don Meow", source: "cat1.png" },
    { key: "2", parent: "1", name: "Demeter", source: "cat2.png" },
    { key: "3", parent: "1", name: "Copricat", source: "cat3.png" },
    { key: "4", parent: "3", name: "Jellylorum", source: "cat4.png" },
    { key: "5", parent: "3", name: "Alonzo", source: "cat5.png" },
    { key: "6", parent: "2", name: "Munkustrap", source: "cat6.png" }
  ];

  public diagramLinkData = [
    { key: -1, from: 'Alpha', to: 'Beta' },
    { key: -2, from: 'Alpha', to: 'Gamma' },
    { key: -3, from: 'Beta', to: 'Beta' },
    { key: -4, from: 'Gamma', to: 'Delta' },
    { key: -5, from: 'Delta', to: 'Alpha' }
  ];

  public diagramDivClassName: string = 'diagram-container';
  public diagramModelData = { prop: 'value' };
  public skipsDiagramUpdate = false;

  public diagramModelChange = function (changes: go.IncrementalData) {
    // when setting state here, be sure to set skipsDiagramUpdate: true since GoJS already has this update
    // (since this is a GoJS model changed listener event function)
    // this way, we don't log an unneeded transaction in the Diagram's undoManager history
    this.skipsDiagramUpdate = true;

    this.diagramNodeData = DataSyncService.syncNodeData(changes, this.diagramNodeData);
    this.diagramLinkData = DataSyncService.syncLinkData(changes, this.diagramLinkData);
    this.diagramModelData = DataSyncService.syncModelData(changes, this.diagramModelData);
  }
}
