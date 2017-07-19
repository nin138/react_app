import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SearchContainer from "./container/search_container";
import WatchContainer from "./container/watch_container";


ReactDOM.render(
    <div id="main">
      <SearchContainer />
      <WatchContainer />
    </div>,
    document.getElementById('app'));