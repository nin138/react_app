import * as React from "react";
import {SearchStoreState} from "../stores/search_store";
import Actions from "../actions/actions";
import {GitHubApi} from "../module/github_apis";
import {ReactNode} from "react";


interface Props {
  inputs: SearchStoreState;
}

export default class SearchInputArea extends React.Component<Props> {
  render() {
    const options: ReactNode = Object.keys(GitHubApi.Sort).filter(v => {return (isNaN(v as any))}).map((v, i) => { return(<option key={v} value={i}>{v}</option>) });
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
              <input type="text" onChange={(e) => this.handleLangChange(e)} />
            </label>
            <label className="c-search-input-area__label">
              <span>Sort by:</span>
              <select onChange={(e) => this.handleSortChange(e)}>
                {options}
              </select>
            </label>
            <label className="c-search-input-area__label">
              <span>Order by:</span>
              <select onChange={(e) => this.handleOrderChange(e)}>
                <option value={"true"}>降順</option>
                <option value={"false"}>昇順</option>
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