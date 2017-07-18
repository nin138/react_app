import * as React from "react"
import SearchTextStore from "../stores/search_store";
import { Container, ReduceStore } from 'flux/utils'
import Action from "../actions/actions";
import SearchResultStore from "../stores/search_result_store";

class Search extends React.Component<any, any> {
  static getStores(): Array<ReduceStore<any,any>> {
    return [SearchTextStore || SearchResultStore]
  }
  static calculateState() {
    return { text: SearchTextStore.getState(), data: SearchResultStore.getState() }
  }
  handleSearchTextChange(e: React.FormEvent<HTMLInputElement>) {
    Action.changeSearchText(e.currentTarget.value)
  }
  render() {
    return(
        <div>
          <p>{this.state.text.text}</p>
          <input type="text" onChange={(e) => this.handleSearchTextChange(e)}/>
        </div>
    )
  }
}


//型定義ファイルに追加
//export function create<TProps>(base: any, options?: RealOptions): Component<TProps, any, any>;
const SearchContainer = Container.create(Search);
export default SearchContainer;