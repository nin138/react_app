import {ReduceStore} from 'flux/utils'
import dispatcher from '../dispatcher/dispathcher'
import {Dispatcher} from 'flux';
import {ActionTypes} from "../actions/action_types";
import {Action} from "../actions/actions";
import {GitHubApi} from "../module/github_apis";
import SearchSuccessAction from "../actions/search_success";
import SearchErrorAction from "../actions/search_error";
import Repository from "../model/repository";
import WatchingRepositoriesStore from "./watching_repositories_store";
import GetSearchNextAction from "../actions/get_search_next";



export class SearchResultStoreState {
  setIsWatchingAll(ids: Array<number>): SearchResultStoreState {
    return new SearchResultStoreState(
        new GitHubApi.SearchResponse(
            this.response.total_count,
            this.response.incomplete_results,
            Repository.setIsWatchingAll(this.response.repositories, ids),
            this.response.nextUrl
        ),
        this.errorCode
    )
  }
  setWatching(ids: Array<number>, value: boolean): SearchResultStoreState {
    return new SearchResultStoreState(
        new GitHubApi.SearchResponse(
            this.response.total_count,
            this.response.incomplete_results,
            Repository.setWatching(this.response.repositories, ids, value),
            this.response.nextUrl
        ),
        this.errorCode
    )
  }
  constructor(
      public response: GitHubApi.SearchResponse = new GitHubApi.SearchResponse(),
      public errorCode: number = 0) {
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
        return new SearchResultStoreState((action as SearchSuccessAction).payload)
            .setIsWatchingAll(WatchingRepositoriesStore.getState().repos.map(v => {return v.id}));
      case ActionTypes.search_error:
        return new SearchResultStoreState(undefined, (action as SearchErrorAction).payload);

      case ActionTypes.get_search_next:
        const ret = (action as GetSearchNextAction).payload;
        ret.repositories = state.response.repositories.concat(
            Repository.setWatching(action.payload.repositories,
            WatchingRepositoriesStore.getState().repos.map(v => {return v.id}),true));
        return new SearchResultStoreState(ret ,0);
      case ActionTypes.get_search_next_error:
        return state; //todo impl

      case ActionTypes.get_watching_repositories:
        return state.setIsWatchingAll(action.payload.map((v: any) => {return v.full_name}));
      case ActionTypes.watch_repository:
        return state.setWatching(action.payload.map((v: any) => {return v.id}), true);
      case ActionTypes.unwatch_repository:
        return state.setWatching(action.payload.map((v: any) => {return v.id}), false);
      default : return state;
    }
  }
}

const instance = new SearchResultStore(dispatcher);
export default instance;