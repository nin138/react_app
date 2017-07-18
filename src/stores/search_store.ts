import {ReduceStore} from 'flux/utils'
import ChangeSearchTextAction from "../actions/change_search_text";
import dispatcher from '../dispatcher/dispathcher'
import {Dispatcher} from 'flux';
import {ActionTypes} from "../actions/action_types";
import Actions, {Action} from "../actions/actions";
import {GitHubApi} from "../module/github_apis";
import Sort = GitHubApi.Sort;

class SearchStoreState {
  constructor(public text: string) {  }
}
export class SearchTextStore extends ReduceStore<SearchStoreState, Action> {
  constructor(dispatcher: Dispatcher<Action>) {
    super(dispatcher);
    this.addListener(() => Actions.searchRepositories(this.getState().text, "", Sort.match, false))
  }

  getInitialState(): SearchStoreState {
    return new SearchStoreState('');
  }

  reduce(state: SearchStoreState, action: Action): SearchStoreState {
    switch (action.type) {
      case ActionTypes.search_text_change:
        const ret = Object.assign({}, state);
        ret.text = (action as ChangeSearchTextAction).payload;
        return ret;
      default : return state;
    }
  }

}

const instance = new SearchTextStore(dispatcher);
export default instance;