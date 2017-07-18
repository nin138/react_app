import {ReduceStore} from 'flux/utils'
import dispatcher from '../dispatcher/dispathcher'
import {Dispatcher} from 'flux';
import {ActionTypes} from "../actions/action_types";
import {Action} from "../actions/actions";
import {GitHubApi} from "../module/github_apis";
import SearchSuccessAction from "../actions/search_success";
import SearchErrorAction from "../actions/search_error";



class SearchResultStoreState {
  constructor(
      public response: GitHubApi.SearchResponse = new GitHubApi.SearchResponse(),
      public errorcode: number = 0) {
  }
}
export class SearchResultStore extends ReduceStore<SearchResultStoreState, Action> {
  constructor(dispatcher: Dispatcher<Action>) {
    super(dispatcher);
  }

  getInitialState(): SearchResultStoreState {
    return new SearchResultStoreState();
  }

  reduce(state: SearchResultStoreState, action: Action): SearchResultStoreState {
    switch (action.type) {
      case ActionTypes.search_success:
        return new SearchResultStoreState((action as SearchSuccessAction).payload);
      case ActionTypes.search_error:
        return new SearchResultStoreState(undefined, (action as SearchErrorAction).payload);
      default : return state;
    }
  }

}

const instance = new SearchResultStore(dispatcher);
export default instance;