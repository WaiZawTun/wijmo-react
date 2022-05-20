import "./bootstrap.css";
import "@grapecity/wijmo.styles/wijmo.css";

import * as React from "react";
import * as wjcCore from "@grapecity/wijmo";
import * as wjcGrid from "@grapecity/wijmo.grid";
import * as wjGrid from "@grapecity/wijmo.react.grid";
import { ODataCollectionView } from "@grapecity/wijmo.odata";
import * as wjFilter from "@grapecity/wijmo.react.grid.filter";

export default class OData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: new ODataCollectionView(
        "https://services.odata.org/Northwind/Northwind.svc",
        "Customers",
        {
          sortOnServer: true,
          filterOnServer: true,
        },
        {
          loaded: (sender, e) => {
            this.setState({
              itemCount: wjcCore.format("{itemCountn0} items", sender),
            });
          },
        }
      ),
      itemCount: "",
    };
  }
  flexInitialized(flexgrid) {
    this.flex = flexgrid;
    flexgrid.loadedRows.addHandler(() => {
      this.setState({ itemCount: flexgrid.rows.length + " items" });
    });
    flexgrid.formatItem.addHandler((s, e) => {
      if (e.panel.CellType === wjcGrid.CellType) {
        e.cell.textContent = (e.rows + 1).toString();
      }
    });
  }
  render() {
    return (
      <div className="container-fluid">
        <p>{this.state.itemCount}</p>
        <wjGrid.FlexGrid
          itemsSource={this.state.customers}
          isReadOnly={true}
          initialized={this.flexInitialized.bind(this)}
        >
          <wjFilter.FlexGridFilter />
        </wjGrid.FlexGrid>
      </div>
    );
  }
}
