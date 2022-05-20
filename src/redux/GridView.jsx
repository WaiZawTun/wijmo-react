// React
import * as React from 'react';
//
// Wijmo
import * as wjInput from '@grapecity/wijmo.react.input';
import * as wjFlexGrid from '@grapecity/wijmo.react.grid';
import * as wjGroupPanel from '@grapecity/wijmo.react.grid.grouppanel';
import * as wjGridFilter from '@grapecity/wijmo.react.grid.filter';
import '@grapecity/wijmo.touch'; // add touch support on mobile devices
//
// Wijmo ImmutabilityProvider
import { DataChangeAction } from '@grapecity/wijmo.grid.immutable';
import { ImmutabilityProvider } from '@grapecity/wijmo.react.grid.immutable';
//
// Presentation component with an editable Redux grid
export class GridView extends React.Component {
    constructor(props) {
        super(props);
        this.onCountChanged = this.onCountChanged.bind(this);
        this.onGridInitialized = this.onGridInitialized.bind(this);
        this.onGridDataChanged = this.onGridDataChanged.bind(this);
        this.groupPanelRef = React.createRef();
        // We store local UI related data in the local state, for simplicity,
        // to not bloat global store with irrelevant data.
        this.state = {
            showStoreData: true
        };
    }
    render() {
        return <div className='container-fluid'>
            <h4>
                Editable FlexGrid without data source mutation
            </h4>
            <div>
                <p>
                    This <b>editable</b> <i>FlexGrid</i> component has an{' '}
                    <i>ImmutabilityProvider</i> component as its child.
                    The latter is bound to the <i>items</i> array from the Redux Store,
                    using its <b>itemsSource</b> property. It also defines a handler for the{' '}
                    <b>ImmutabilityProvider.dataChanged</b> event, which is triggered when a
                    user edits data via the grid, and is used to dispatch data change
                    <i>actions</i> to the Redux Store.
                </p>
                <p>
                    The items in the Redux Store array are frozen using the <b>Object.freeze()</b>{' '}
                    method, to make sure that FlexGrid really doesn't change the underlying data.
                    User edits in datagrid don't mutate the underlying data directly. Instead,
                    the data change <i>actions</i> called from the <b>dataChanged</b> event handler
                    cause Redux Store <i>reducers</i> to update the <i>items</i> array in the global
                    State.
                    Because the <i>ImmutabilityProvider.itemsSource</i> property is bound directly to
                    this array, it detects the applied changes and causes <b>FlexGrid</b> to update
                    its content to reflect the changes.
                    Notice that the overall performance of this seemingly complex process is nice,
                    the edits are applied instantly.
                </p>
                <p>
                    This way you get a usual data editing experience in the datagrid.
                    But instead of directly mutating the underlying data array, the updates are 
                    performed via the Redux Store <i>reducers</i> mechanism.
                    You can also sort, group, and filter the data as usual.
                </p>

                <div>
                    <wjInput.Menu header='Item Count' value={this.props.itemCount} itemClicked={this.onCountChanged}>
                        <wjInput.MenuItem value={5}>5</wjInput.MenuItem>
                        <wjInput.MenuItem value={50}>50</wjInput.MenuItem>
                        <wjInput.MenuItem value={100}>100</wjInput.MenuItem>
                        <wjInput.MenuItem value={500}>500</wjInput.MenuItem>
                        <wjInput.MenuItem value={5000}>5,000</wjInput.MenuItem>
                        <wjInput.MenuItem value={10000}>10,000</wjInput.MenuItem>
                        <wjInput.MenuItem value={50000}>50,000</wjInput.MenuItem>
                        <wjInput.MenuItem value={100000}>100,000</wjInput.MenuItem>
                    </wjInput.Menu>
                </div>
                <wjGroupPanel.GroupPanel ref={this.groupPanelRef} placeholder="Drag columns here to create groups."/>
            </div>
            <div>
                <wjFlexGrid.FlexGrid allowAddNew allowDelete initialized={this.onGridInitialized}>
                    <ImmutabilityProvider itemsSource={this.props.items} dataChanged={this.onGridDataChanged}/>
                    <wjGridFilter.FlexGridFilter />
                    <wjFlexGrid.FlexGridColumn binding="id" header="ID" width={80} isReadOnly={true}/>
                    <wjFlexGrid.FlexGridColumn binding="start" header="Date" format="d"/>
                    <wjFlexGrid.FlexGridColumn binding="end" header="Time" format="t"/>
                    <wjFlexGrid.FlexGridColumn binding="country" header="Country"/>
                    <wjFlexGrid.FlexGridColumn binding="product" header="Product"/>
                    <wjFlexGrid.FlexGridColumn binding="sales" header="Sales" format="n2"/>
                    <wjFlexGrid.FlexGridColumn binding="downloads" header="Downloads" format="n0"/>
                    <wjFlexGrid.FlexGridColumn binding="active" header="Active" width={80}/>
                </wjFlexGrid.FlexGrid>
            </div>

            <div>
                <h4>
                    Check data in the Store
                </h4>
                <p>
                    This <b>read-only</b> grid shows the same data array from the Redux Store,
                    to allow you controlling how the update operations go.
                </p>
                <p>
                    If you evaluate performance of the data change operations on a big array,
                    you may want to disconnect it from the data by means of the
                    checkbox below, to not bring additional performance penalties caused
                    by this grid refresh.
                </p>
                <input type="checkbox" checked={this.state.showStoreData} onChange={(e) => {
            this.setState({ showStoreData: e.target.checked });
        }}/>
                {' '}
                <b>Show data</b>
                <wjFlexGrid.FlexGrid itemsSource={this.state.showStoreData ? this.props.items : null} isReadOnly/>
            </div>

        </div>;
    }
    onCountChanged(s) {
        this.props.changeCountAction(s.selectedValue);
    }
    onGridInitialized(s) {
        // Attach group panel
        this.groupPanelRef.current.control.grid = s;
    }
    // Dispatches data change actions to the Redux Store in response to
    // user edits made via the grid.
    onGridDataChanged(s, e) {
        switch (e.action) {
            case DataChangeAction.Add:
                this.props.addItemAction(e.newItem);
                break;
            case DataChangeAction.Remove:
                this.props.removeItemAction(e.newItem, e.itemIndex);
                break;
            case DataChangeAction.Change:
                this.props.changeItemAction(e.newItem, e.itemIndex);
                break;
            default:
                // eslint-disable-next-line no-throw-literal
                throw 'Unknown data action';
        }
    }
}
