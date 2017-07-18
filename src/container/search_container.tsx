import * as React from "react"
import SearchTextStore from "../stores/search_store";
import {Container, ReduceStore} from 'flux/utils'
import Action from "../actions/actions";
import SearchResultStore from "../stores/search_result_store";
import Repository from "../model/repository";

class Search extends React.Component<any, any> {
  static getStores(): Array<ReduceStore<any,any>> {
    return [SearchTextStore, SearchResultStore]
  }
  static calculateState() {
    return { searchText: SearchTextStore.getState(), searchResult: SearchResultStore.getState() }
  }
  handleSearchTextChange(e: React.FormEvent<HTMLInputElement>) {
    Action.changeSearchText(e.currentTarget.value)
  }
  render() {
    const list = this.state.searchResult.response.repositories.map((r: Repository) => { return(<li key={r.id}>{r.full_name}</li>) });
    return(
        <div>
          <p>{this.state.searchText.text}</p>
          <input type="text" onChange={(e) => this.handleSearchTextChange(e)}/>
          <ul>
            { list }
          </ul>
        </div>
    )
  }
}


//型定義ファイルに追加
//export function create<TProps>(base: any, options?: RealOptions): Component<TProps, any, any>;
const SearchContainer = Container.create(Search);
export default SearchContainer;