import {ReduceStore} from 'flux/utils'
import dispatcher from '../dispatcher/dispathcher'
import {Dispatcher} from 'flux';
import {ActionTypes} from "../actions/action_types";
import {Action} from "../actions/actions";
import Repository from "../model/repository";



class WatchingRepositoriesState {
  constructor(public repos: Array<Repository> = []) {}
}

export class WatchingRepositoriesStore extends ReduceStore<WatchingRepositoriesState, Action> {
  constructor(dispatcher: Dispatcher<Action>) {
    super(dispatcher);
  }

  getInitialState(): WatchingRepositoriesState {
    return new WatchingRepositoriesState();
  }

  reduce(state: WatchingRepositoriesState, action: Action): WatchingRepositoriesState {
    switch (action.type) {
      case ActionTypes.get_watching_repositories:
        console.log(action.payload);
        return new WatchingRepositoriesState(action.payload);
      case ActionTypes.get_watching_error:
        //todo err
          console.log("err on get watch :");
        console.log(action.payload);
        return new WatchingRepositoriesState();
      default : return state;
    }
  }

}

const instance = new WatchingRepositoriesStore(dispatcher);
export default instance;