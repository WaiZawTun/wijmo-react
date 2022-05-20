import "./bootstrap.css";
import "@grapecity/wijmo.styles/wijmo.css";

import React from "react";
import * as wjGrid from "@grapecity/wijmo.react.grid";
import * as wjcGrid from "@grapecity/wijmo.grid";

export default class UnboundGrid extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <wjGrid.FlexGrid initialized={this.flexInitialized.bind(this)} />
      </div>
    );
  }
  flexInitialized(flex) {
    this.flex = flex;
    flex.scrollPositionChanged.addHandler((s, e) => {
        if (s.viewRange.bottomRow >= s.rows.length - 1) {
          this.update(s.rows.length, 2);
        }
      if (s.viewRange.rightCol >= s.columns.length - 1) {
        this.update(s.columns.length, 2);
      }
    });
  }
  update(length, start) {
    if (this.flex) {
      this.flex.allowResizing = wjcGrid.AllowResizing.Both;
      this.flex.allowDraging = wjcGrid.AllowDragging.Both;
      let r, c;
      if (start == null) {
        start = 0;
      }
      for (r = 0; r < length; r++) {
        this.flex.rows.push(new wjcGrid.Row());
      }
      for (c = 0; c < length; c++) {
        this.flex.columns.push(new wjcGrid.Column());
      }
      //   for (i = 0; i < 3; i++) {
      //     this.flex.columnHeaders.rows.insert(0, new wjcGrid.Row());
      //     this.flex.rowHeaders.columns.insert(0, new wjcGrid.Column());
      //   }

      for (r = 0; r < this.flex.rows.length; r++) {
        for (c = 0; c < this.flex.columns.length; c++) {
          this.flex.setCellData(r, c, "r" + r + "c" + c);
        }
      }

      let p = this.flex.columnHeaders;
      for (r = 0; r < p.rows.length; r++) {
        for (c = 0; c < p.columns.length; c++) {
          p.setCellData(r, c, "cHdr r" + r + ", c" + c);
        }
      }
      p = this.flex.rowHeaders;
      for (r = 0; r < p.rows.length; r++) {
        for (c = 0; c < p.columns.length; c++) {
          p.setCellData(r, c, "rHdr r" + r + ", c" + c);
        }
      }
      p = this.flex.topLeftCells;
      for (r = 0; r < p.rows.length; r++) {
        for (c = 0; c < p.columns.length; c++) {
          p.setCellData(r, c, "tl r" + r + ", c" + c);
        }
      }
    }
  }
  componentDidMount() {
    this.update(50);
  }
}
