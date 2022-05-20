import "./bootstrap.css";
import "@grapecity/wijmo.styles/wijmo.css";

import React from "react";
import { FlexGrid, FlexGridColumn } from "@grapecity/wijmo.react.grid";
import { format, SortDescription } from "@grapecity/wijmo";

export default class Basic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.getData(),
      selectedItem: "",
    };
  }
  getData() {
    const countries = "Myanmar,Japan,Korea,Singapore,Thailand".split(","),
      data = [];
    for (let i = 0; i < countries.length; i++) {
      data.push({
        country: countries[i],
        sales: Math.random() * 10000,
        expenses: Math.random() * 5000,
      });
    }
    return data;
  }
  render() {
    return (
      <div className="container-fluid">
        <p dangerouslySetInnerHTML={{ __html: this.state.selectedItem }} />
        <FlexGrid
          initialized={this.flexInitialized.bind(this)}
          itemsSource={this.state.data}
        >
          {/* <wjFilter.FlexGridFilter> */}
            <FlexGridColumn header="Country" binding="country" width="2*" />
            <FlexGridColumn
              header="Sales"
              binding="sales"
              width="*"
              format="n2"
            />
            <FlexGridColumn
              header="Expenses"
              binding="expenses"
              width="*"
              format="n2"
            />
          {/* </wjFilter.FlexGridFilter> */}
        </FlexGrid>
      </div>
    );
  }
  flexInitialized(flexgrid) {
    this.flex = flexgrid;
    let sd = new SortDescription("country", true);
    flexgrid.collectionView.sortDescriptions.push(sd);
    flexgrid.collectionView.currentChanged.addHandler(
      this.updateCurrentInfo.bind(this)
    );
    this.updateCurrentInfo();
  }
  updateCurrentInfo() {
    this.setState({
      selectedItem: format(
        "Country: <b>{country}</b>, Sales: <b>{sales:c0}</b>, Expenses: <b>{expenses:c0}</b>",
        this.flex.collectionView.currentItem
      ),
    });
  }
}
