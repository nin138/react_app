import {dispatch} from "../dispatcher/dispathcher"
import ChangeSearchTextAction from "./change_search_text";
import {ActionTypes} from "./action_types";
import {GitHubApi} from "../module/github_apis";
import SearchTextStore from "../stores/search_store";
import SearchSuccessAction from "./search_success";
import SearchErrorAction from "./search_error";
import ChangeSearchLangAction from "./change_search_lang";

export interface Action {
  type: ActionTypes
  payload: any
}

const Actions = {
  changeSearchText: (text: string) => {
    dispatch(new ChangeSearchTextAction(text));
    Actions.searchRepositories();
  },
  changeLangText: (lang: string) => {
    dispatch(new ChangeSearchLangAction(lang));
    Actions.searchRepositories();
  },
  searchRepositories: () => {
    const state = SearchTextStore.getState();
    new GitHubApi.Search().word(state.text).lang(state.lang).sort(state.sort).desk(state.isDesc).get(
        res => dispatch(new SearchSuccessAction(res)),
        err => dispatch(new SearchErrorAction(err))
    )
  },
};
export default Actions