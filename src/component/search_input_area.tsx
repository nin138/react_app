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
        <div>
          <input type="text" onChange={(e) => this.handleTextChange(e)} />
          <input type="text" onChange={(e) => this.handleLangChange(e)} />
          <select onChange={(e) => this.handleSortChange(e)}>
            {options}
          </select>
          <select onChange={(e) => this.handleOrderChange(e)}>
            <option value={"true"}>降順</option>
            <option value={"false"}>昇順</option>
          </select>
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