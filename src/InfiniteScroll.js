import "./bootstrap.css";
import "@grapecity/wijmo.styles/wijmo.css";

import React from "react";
import * as wjGrid from "@grapecity/wijmo.react.grid";
import * as wjFilter from "@grapecity/wijmo.react.grid.filter"

export default class InfiniteScroll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.getData(100),
      rowCount: "",
      cellCount: "",
    };
  }

  flexInitialized(flexgrid) {
    this.setState({
      rowCount: flexgrid.rows.length.toString(),
      cellCount: flexgrid.hostElement
        .querySelectorAll(".wj-cell")
        .length.toString(),
    });
    flexgrid.updatedView.addHandler((s, e) => {
      this.setState({
        rowCount: s.rows.length.toString(),
        cellCount: s.hostElement.querySelectorAll(".wj-cell").length.toString(),
      });
    });
    flexgrid.scrollPositionChanged.addHandler((s, e) => {
      if (s.viewRange.bottomRow >= s.rows.length - 1) {
        let view = s.collectionView;
        let index = view.currentPosition;
        this.addData(this.state.data, 20);
        view.refresh();
        view.currentPosition = index;
      }
    });
  }
  addData(data, cnt) {
    let more = this.getData(cnt, data.length);
    for (let i = 0; i < more.length; i++) {
      data.push(more[i]);
    }
  }

  getData(cnt, start) {
    let countries = "Myanmar,Japan,Korea,Thailand,Singapore,China".split(","),
      data = [],
      year = new Date().getFullYear;
    if (start == null) {
      start = 0;
    }
    for (let i = 0; i < cnt; i++) {
      data.push({
        id: i + start,
        country: countries[i % countries.length],
        date: new Date(year, i % 12, i % 28),
        active: i % (i / 3) === 0,
      });
    }
    return data;
  }

  render() {
    return (
      <div className="container-fluid">
        <wjGrid.FlexGrid
          initialized={this.flexInitialized.bind(this)}
          itemsSource={this.state.data}
        >
          <wjFilter.FlexGridFilter />
        </wjGrid.FlexGrid>
        <p>
          The grid now has <span id="rowCount">{this.state.rowCount}</span> rows
          and <span id="cellCount">{this.state.cellCount}</span> cell elements.
        </p>
      </div>
    );
  }
}
