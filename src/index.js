import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css'
import Basic from './App';
import OData from './OData'
import reportWebVitals from './reportWebVitals';
import VirtualOData from './virtualOData';
import InfiniteScroll from './InfiniteScroll';
import UnboundGrid from './unboundGrid';
import ColumnWidth from './column/width/Width';
// import EditableRedux from './redux/app';

const root = ReactDOM.createRoot(document.getElementById('app'))
root.render(
  <div>
    <Basic />
    <OData />
    <VirtualOData />
    <InfiniteScroll />
    <UnboundGrid />
    {/* <EditableRedux /> */}
    <ColumnWidth />
  </div>
)

reportWebVitals();
