import {ReduceStore} from 'flux/utils'
import dispatcher from '../dispatcher/dispathcher'
import {Dispatcher} from 'flux';
import {ActionTypes} from "../actions/action_types";
import {Action} from "../actions/actions";
import Repository from "../model/repository";
import WatchRepositoryAction from "../actions/watch_repository";
import UnwatchRepositoryAction from "../actions/unwatch_repository";



export class WatchingRepositoriesState {
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
        return new WatchingRepositoriesState(action.payload);
      case ActionTypes.get_watching_error:
        //todo err
        return new WatchingRepositoriesState();
      case ActionTypes.watch_repository:
        return new WatchingRepositoriesState((action as WatchRepositoryAction).payload.filter(v => {
          return (!state.repos.includes(v));
        }).concat(state.repos));
      case ActionTypes.watch_repository_error:
        //todo err
        return state;
      case ActionTypes.unwatch_repository:
        return new WatchingRepositoriesState(state.repos.filter(v => {
          return (!(action as UnwatchRepositoryAction).payload.includes(v))
        }));
      case ActionTypes.unwatch_repository_error:
        //todo err
        return state;
      default : return state;
    }
  }

}

const instance = new WatchingRepositoriesStore(dispatcher);
export default instance;