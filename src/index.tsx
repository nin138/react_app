import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SearchContainer from "./container/search_container";
import {GitHubApi} from "./module/github_apis";
import Sort = GitHubApi.Sort;

new GitHubApi.Search()
    .word("test api")
    .lang("Rust")
    .desk(true)
    .sort(Sort.forks)
    .get(v => console.log(v), () => {});

ReactDOM.render(<SearchContainer />, document.getElementById('app'));