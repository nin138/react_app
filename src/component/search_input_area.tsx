import * as React from "react";
import {SearchStoreState} from "../stores/search_store";
import Actions from "../actions/actions";
import {GitHubApi} from "../module/github_apis";
import {ReactNode} from "react";
import {Languages} from "../constants";


interface Props {
  inputs: SearchStoreState;
}

export default class SearchInputArea extends React.Component<Props> {
  componentDidMount() {
    const inpLang = document.getElementById("input-lang");
    if(inpLang != null) {
      inpLang.setAttribute("autocomplete", "on");
      inpLang.setAttribute("list", "lang-list");
    }

  }
  render() {
    const langOptions = Languages.map(v => { return(<option key={v} value={v} />) });
    const sortOptions: ReactNode = Object.keys(GitHubApi.Sort).filter(v => {return (isNaN(v as any))}).map((v, i) => { return(<option key={v} value={i}>{v}</option>) });
    return(
        <div className="c-search-input-area">
          <div className="c-search-input-area__wrap">
            <label className="c-search-input-area__keyword-label c-search-input-area__label">
              <span>Keywords:</span>
              <input className="c-search-input-area__keyword" type="text" onChange={(e) => this.handleTextChange(e)} />
            </label>
          </div>
          <div className="c-search-input-area__wrap">
            <label className="c-search-input-area__wrap__lang-label c-search-input-area__label">
              <span>Language:</span>
              <input id="input-lang" type="text" ref="inputLang" onChange={(e) => this.handleLangChange(e)} />
              <datalist id="lang-list">
                {langOptions}
              </datalist>
            </label>
            <label className="c-search-input-area__label">
              <span>Sort by:</span>
              <select onChange={(e) => this.handleSortChange(e)}>
                {sortOptions}
              </select>
            </label>
            <label className="c-search-input-area__label">
              <span>Order by:</span>
              <select onChange={(e) => this.handleOrderChange(e)}>
                <option value={"true"}>desc</option>
                <option value={"false"}>asc</option>
              </select>
            </label>
          </div>
        </div>
    )
  }
  handleTextChange(e: React.FormEvent<HTMLInputElement>) {
    Actions.changeSearchText(e.currentTarget.value)
  }
  handleLangChange(e: React.FormEvent<HTMLInputElement>) {
    Actions.changeSearchLang(e.currentTarget.value)
  }
  handleSortChange(e: React.FormEvent<HTMLSelectElement>) {
    Actions.changeSearchSort(+e.currentTarget.value)
  }
  handleOrderChange(e: React.FormEvent<HTMLSelectElement>) {
    Actions.changeSearchOrder(e.currentTarget.value == "true")
  }
}