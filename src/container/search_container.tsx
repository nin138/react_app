import * as React from "react"
import SearchTextStore, {SearchStoreState} from "../stores/search_store";
import {Container, ReduceStore} from 'flux/utils'
import SearchResultStore, {SearchResultStoreState} from "../stores/search_result_store";
import SearchResultArea from "../component/search_result_area";
import SearchInputArea from "../component/search_input_area";

interface State {
  searchText: SearchStoreState;
  searchResult: SearchResultStoreState;
}
class Search extends React.Component<{}, State> {
  static getStores(): Array<ReduceStore<any,any>> {
    return [SearchTextStore, SearchResultStore]
  }
  static calculateState() {
    return { searchText: SearchTextStore.getState(), searchResult: SearchResultStore.getState() }
  }
  render() {
    return(
        <section className="l-search-container">
          <div className="l-search-container__header">
            <h1 className="l-search-container__header__h1">Search Repositories</h1>
            <SearchInputArea inputs={this.state.searchText} />
          </div>
          <SearchResultArea result={this.state.searchResult} />
        </section>
    )
  }
}


//型定義ファイルに追加
//export function create<TProps>(base: any, options?: RealOptions): Component<TProps, any, any>;
const SearchContainer = Container.create(Search);
export default SearchContainer;