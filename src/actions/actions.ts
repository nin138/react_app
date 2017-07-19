import {dispatch} from "../dispatcher/dispathcher"
import ChangeSearchTextAction from "./change_search_text";
import {ActionTypes} from "./action_types";
import {GitHubApi} from "../module/github_apis";
import SearchTextStore from "../stores/search_store";
import SearchSuccessAction from "./search_success";
import SearchErrorAction from "./search_error";
import ChangeSearchLangAction from "./change_search_lang";
import ChangeSearchSortAction from "./change_search_sort";
import ChangeSearchOrderAction from "./change_search_order";
import ApiKeyStore from "../stores/api_key_store";
import GetWatchingRepositoriesAction from "./get_watching_reopsitories";
import GetWatchingErrorAction from "./get_watching_error";
import WatchRepositoryErrorAction from "./watch_repository_error";
import WatchRepositoryAction from "./watch_repository";
import UnwatchRepositoryAction from "./unwatch_repository";
import UnwatchRepositoryErrorAction from "./unwatch_repository_error";

export interface Action {
  type: ActionTypes
  payload: any
}

const Actions = {
  changeSearchText: (text: string) => {
    dispatch(new ChangeSearchTextAction(text));
    Actions.searchRepositories();
  },
  changeSearchLang: (lang: string) => {
    dispatch(new ChangeSearchLangAction(lang));
    Actions.searchRepositories();
  },
  changeSearchSort: (sort: GitHubApi.Sort) => {
    dispatch(new ChangeSearchSortAction(sort));
    Actions.searchRepositories();
  },
  changeSearchOrder: (isDesc: boolean) => {
    dispatch(new ChangeSearchOrderAction(isDesc));
    Actions.searchRepositories();
  },
  searchRepositories: () => {
    const state = SearchTextStore.getState();
    new GitHubApi.Search()
        .word(state.text)
        .lang(state.lang)
        .sort(state.sort)
        .desk(state.isDesc)
        .apiKey(ApiKeyStore.getState().key)
        .get(
          res => dispatch(new SearchSuccessAction(res)),
          err => dispatch(new SearchErrorAction(err))
    );
  },
  getWatchingRepositories: () => {
    new GitHubApi.User.Watching().key(ApiKeyStore.getState().key).get(
        res => dispatch(new GetWatchingRepositoriesAction(res)),
        err => dispatch(new GetWatchingErrorAction(err))
    )
  },
  watchRepository: (owner: string, repo: string) => {
    new GitHubApi.Repo.Watch().key(ApiKeyStore.getState().key).owner(owner).repo(repo).subscribe(
        res => dispatch(new WatchRepositoryAction(res)),
        err => dispatch(new WatchRepositoryErrorAction(err))
    )
  },
  unwatchRepository: (owner: string, repo: string) => {
    new GitHubApi.Repo.Watch().key(ApiKeyStore.getState().key).owner(owner).repo(repo).unwatch(
        res => dispatch(new UnwatchRepositoryAction(res)),
        err => dispatch(new UnwatchRepositoryErrorAction(err))
    )
  },
};
export default Actions