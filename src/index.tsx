import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SearchContainer from "./container/search_container";
import WatchContainer from "./container/watch_container";

ReactDOM.render(
    <div>
      <header className="header">
        <h1 className="header__h1">Search and Watch Repositories on GitHub</h1>
      </header>
      <div id="main">
        <SearchContainer />
        <WatchContainer />
      </div>
    </div>,
    document.getElementById('app'));
