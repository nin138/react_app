import {ReduceStore} from 'flux/utils'
import dispatcher from '../dispatcher/dispathcher'
import {Dispatcher} from 'flux';
import {ActionTypes} from "../actions/action_types";
import {Action} from "../actions/actions";
import {GitHubApi} from "../module/github_apis";

export class SearchStoreState {
  [key: string]: any
  static change(state: SearchStoreState, key: string, value: any) {
    const ret = Object.assign({}, state);
    ret[key] =  value;
    return ret;
  }
  constructor(
      public text: string = "",
      public lang: string = "",
      public sort: GitHubApi.Sort = GitHubApi.Sort.match,
      public isDesc: boolean = false
  ) {  }
}
export class SearchTextStore extends ReduceStore<SearchStoreState, Action> {
  constructor(dispatcher: Dispatcher<Action>) {
    super(dispatcher);
  }

  getInitialState(): SearchStoreState {
    return new SearchStoreState();
  }

  reduce(state: SearchStoreState, action: Action): SearchStoreState {
    switch (action.type) {
      case ActionTypes.search_text_change:
        return SearchStoreState.change(state, "text", action.payload);
      case ActionTypes.search_lang_change:
        return SearchStoreState.change(state, "lang", action.payload);
      default : return state;
    }
  }

}

const instance = new SearchTextStore(dispatcher);
export default instance;