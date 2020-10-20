import { Component, ViewEncapsulation } from '@angular/core';
import { DataSyncService } from 'gojs-angular';
import * as go from 'gojs';

const colors = {
  'red': '#be4b15',
  'green': '#52ce60',
  'blue': '#6ea5f8',
  'lightred': '#fd8852',
  'lightblue': '#afd4fe',
  'lightgreen': '#b9e986',
  'pink': '#faadc1',
  'purple': '#d689ff',
  'orange': '#fdb400',
};

@Component({
  selector: 'data-model-diagram',
  templateUrl: './data-model-diagram.component.html',
  styleUrls: ['./data-model-diagram.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DataModelDiagramComponent {
  public initDiagram(): go.Diagram {
    const $ = go.GraphObject.make;

    const diagram = $(go.Diagram, {
      'undoManager.isEnabled': true,
      allowDelete: false,
      allowCopy: false,
      layout: $(go.ForceDirectedLayout),
    });



    const itemTempl =
      $(go.Panel, "Horizontal",
        $(go.Shape,
          { desiredSize: new go.Size(15, 15), strokeJoin: "round", strokeWidth: 3, stroke: null, margin: 2 },
          new go.Binding("figure", "figure"),
          new go.Binding("fill", "color"),
          new go.Binding("stroke", "color")),
        $(go.TextBlock,
          {
            stroke: "#333333",
            font: "bold 14px sans-serif"
          },
          new go.Binding("text", "name"))
      );

    diagram.nodeTemplate = $(go.Node, "Auto",  // the whole node panel
      {
        selectionAdorned: true,
        resizable: true,
        layoutConditions: go.Part.LayoutStandard & ~go.Part.LayoutNodeSized,
        fromSpot: go.Spot.AllSides,
        toSpot: go.Spot.AllSides,
        isShadowed: true,
        shadowOffset: new go.Point(3, 3),
        shadowColor: "#C5C1AA"
      },
      new go.Binding("location", "location").makeTwoWay(),
      // whenever the PanelExpanderButton changes the visible property of the "LIST" panel,
      // clear out any desiredSize set by the ResizingTool.
      new go.Binding("desiredSize", "visible", function (v) { return new go.Size(NaN, NaN); }).ofObject("LIST"),
      // define the node's outer shape, which will surround the Table
      $(go.Shape, "RoundedRectangle",
        { fill: 'white', stroke: "#eeeeee", strokeWidth: 3 }),
      $(go.Panel, "Table",
        { margin: 8, stretch: go.GraphObject.Fill },
        $(go.RowColumnDefinition, { row: 0, sizing: go.RowColumnDefinition.None }),
        // the table header
        $(go.TextBlock,
          {
            row: 0, alignment: go.Spot.Center,
            margin: new go.Margin(0, 24, 0, 2),  // leave room for Button
            font: "bold 16px sans-serif"
          },
          new go.Binding("text", "key")),
        // the collapse/expand button
        $("PanelExpanderButton", "LIST",  // the name of the element whose visibility this button toggles
          { row: 0, alignment: go.Spot.TopRight }),
        // the list of Panels, each showing an attribute
        $(go.Panel, "Vertical",
          {
            name: "LIST",
            row: 1,
            padding: 3,
            alignment: go.Spot.TopLeft,
            defaultAlignment: go.Spot.Left,
            stretch: go.GraphObject.Horizontal,
            itemTemplate: itemTempl
          },
          new go.Binding("itemArray", "items"))
      )  // end Table Panel
    );  // end Node

    diagram.linkTemplate = $(go.Link,  // the whole link panel
      {
        selectionAdorned: true,
        layerName: "Foreground",
        reshapable: true,
        routing: go.Link.AvoidsNodes,
        corner: 5,
        curve: go.Link.JumpOver
      },
      $(go.Shape,  // the link shape
        { stroke: "#303B45", strokeWidth: 2.5 }),
      $(go.TextBlock,  // the "from" label
        {
          textAlign: "center",
          font: "bold 14px sans-serif",
          stroke: "#1967B3",
          segmentIndex: 0,
          segmentOffset: new go.Point(NaN, NaN),
          segmentOrientation: go.Link.OrientUpright
        },
        new go.Binding("text", "text")),
      $(go.TextBlock,  // the "to" label
        {
          textAlign: "center",
          font: "bold 14px sans-serif",
          stroke: "#1967B3",
          segmentIndex: -1,
          segmentOffset: new go.Point(NaN, NaN),
          segmentOrientation: go.Link.OrientUpright
        },
        new go.Binding("text", "toText"))
    );

    return diagram
  }

  public diagramNodeData = [
    {
      key: "Personal Details",
      items: [
        { name: "Employee ID (7 Char)", iskey: true, figure: "Decision", color: colors.red },
        { name: "FirstName (10 Char)", iskey: true, figure: "Decision", color: colors.red },
        { name: "Second Name (10 Char)", iskey: false, figure: "Hexagon", color: colors.blue },
        { name: "Designation (15 Char)", iskey: false, figure: "Hexagon", color: colors.blue },
        { name: "Date of Birth (8 Num)", iskey: false, figure: "Hexagon", color: colors.blue },
        { name: "Address", iskey: false, figure: "Decision", color: "purple" },
        { name: "Phone (10 Num)", iskey: false, figure: "Decision", color: "purple" },
        { name: "Email (15 Char)", iskey: false, figure: "Decision", color: "purple" },
        { name: "Designation (12 Char)", iskey: false, figure: "Decision", color: "purple" },
        { name: "Assigned Team (Dropdown)", iskey: false, figure: "Decision", color: "purple" },
        { name: "Joining Date (Date Picker)", iskey: false, figure: "Decision", color: "purple" },
      ]
    },
    {
      key: "Address",
      items: [
        { name: "Street Name (10 Char)", iskey: true, figure: "Decision", color: colors.red },
        { name: "House Number (10 Char)", iskey: false, figure: "Hexagon", color: colors.blue },
        { name: "Building Name (10 Char)", iskey: false, figure: "Hexagon", color: colors.blue },
        { name: "Landmark (20 Char)", iskey: false, figure: "Hexagon", color: colors.blue },
        { name: "City (20 Char)", iskey: false, figure: "Hexagon", color: colors.blue },
        { name: "Country (20 Char)", iskey: false, figure: "Hexagon", color: colors.blue },
        { name: "Post Code (Postcode)", iskey: false, figure: "Hexagon", color: colors.blue },
      ]
    },
    {
      key: "Assigned Team",
      items: [
        { name: "Add Manager (Dropdown)", iskey: true, figure: "Decision", color: colors.red },
        { name: "Team Details (Dropdwon)", iskey: false, figure: "Hexagon", color: colors.blue }]
    },
    {
      key: "Bank Details",
      items: [
        { name: "Account Number(18 Char)", iskey: true, figure: "Decision", color: colors.red },
        { name: "Bank Name(18 Char)", iskey: true, figure: "Decision", color: colors.red },
        { name: "Branch (10 Char)", iskey: true, figure: "Decision", color: colors.red },
        { name: "IFSC (10 Char)", iskey: false, figure: "Circle", color: colors.green }]
    },
    {
      key: "Education Details",
      items: [
        { name: "College Name (Dropdown)", iskey: true, figure: "Decision", color: colors.red },
        { name: "Start Year (Date Picker)", iskey: true, figure: "Decision", color: colors.red },
        { name: "End Year (Date Picker)", iskey: true, figure: "Decision", color: colors.red }]
    },
  ];

  public diagramLinkData = [
    { from: "Personal Details", to: "Address", text: "0..N", toText: "1" },
    { from: "Personal Details", to: "Assigned Team", text: "0..N", toText: "1" },
    { from: "Personal Details", to: "Bank Details", text: "0..N", toText: "1" },
    { from: "Personal Details", to: "Education Details", text: "0..N", toText: "1" }
  ];

  public diagramDivClassName: string = 'data-model-diagram-container';
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
