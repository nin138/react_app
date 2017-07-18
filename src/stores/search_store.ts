import {ReduceStore} from 'flux/utils'
import ChangeSearchTextAction from "../actions/change_search_text";
import dispatcher from '../dispatcher/dispathcher'
import {Dispatcher} from 'flux';
import {ActionTypes} from "../actions/action_types";
import {Action} from "../actions/actions";

class SearchStoreState {
  constructor(public text: string) {  }
}
export class SearchTextStore extends ReduceStore<SearchStoreState, Action> {
  constructor(dispatcher: Dispatcher<Action>) {
    super(dispatcher);
  }

  getInitialState(): SearchStoreState {
    return new SearchStoreState("");
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