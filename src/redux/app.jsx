import '../bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
//React/Redux
import * as React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
//Application
import { appReducer } from './reducers';
import { GridViewContainer } from './GridViewContainer';
// Create global Redux Store
const store = createStore(appReducer);
export default class EditableRedux extends React.Component {
    render() {
        return <Provider store={store}>
            <GridViewContainer />
          </Provider>;
    }
}