import { ReduceStore } from 'flux/utils'
import ChangeSearchTextAction from "../actions/change_search_text";
import dispatcher from '../dispatcher/dispathcher'
import { Dispatcher } from 'flux';
import {ActionTypes} from "../actions/action_types";
import {Action} from "../actions/actions";
import Repository from "../model/repository";



class SearchResultStoreState {
  constructor(public total_count: number,
              public incomplete_results: boolean,
              public repositories: Array<Repository>
  ) {}
}
export class SearchResultStore extends ReduceStore<SearchResultStoreState, Action> {
  constructor(dispatcher: Dispatcher<ChangeSearchTextAction>) {
    super(dispatcher);
  }

  getInitialState(): SearchResultStoreState {
    return new SearchResultStoreState(0, false, []);
  }

  reduce(state: SearchResultStoreState, action: Action): SearchResultStoreState {
    switch (action.type) {
      case ActionTypes.search_repositories:
      default : return state;
    }
  }

}

const instance = new SearchResultStore(dispatcher);
export default instance;