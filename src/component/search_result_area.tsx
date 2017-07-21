import * as React from "react";
import Repository from "../model/repository";
import RepositoryComponent from "./repository";
import {SearchResultStoreState} from "../stores/search_result_store";

interface Props {
  result: SearchResultStoreState
}

export default class SearchResultArea extends React.Component<Props> {
  render() {
    const list = this.props.result.response.repositories.map((r: Repository) => { return(<RepositoryComponent key={r.id} repo={r} />) });
    return(
        <div className="l-search-container__body">
          <p className="l-search-container__body__counter">{this.props.result.response.total_count} results</p>
          { list }
        </div>
    )
  }
}