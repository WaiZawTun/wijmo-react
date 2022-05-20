import "../../bootstrap.css";
import "@grapecity/wijmo.styles/wijmo.css";

import React from "react";
import * as wjGrid from "@grapecity/wijmo.react.grid";
import { getData } from "./data";

export default class ColumnWidth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: getData(500),
    };
  }
  render() {
    return (
      <div className="container-fluid">
        <wjGrid.FlexGrid itemsSource={this.state.data} autoClipboard={false}>
          <wjGrid.FlexGridColumn header="Date" binding="start" width={80} />
          <wjGrid.FlexGridColumn header="End Date" binding="end" width={80} />
          <wjGrid.FlexGridColumn
            header="Product"
            binding="product"
            width="*"
            minWidth={100}
            allowResizing={true}
            format="n0"
          />
          <wjGrid.FlexGridColumn
            header="Revenue"
            binding="amount"
            width={120}
            format="n0"
          />
          <wjGrid.FlexGridColumn
            header="Expense"
            binding="amount2"
            width={120}
            // format="n0"
          />
        </wjGrid.FlexGrid>
      </div>
    );
  }
}
