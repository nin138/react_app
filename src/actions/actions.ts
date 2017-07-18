import {dispatch} from "../dispatcher/dispathcher"
import ChangeSearchTextAction from "./change_search_text";
import {ActionTypes} from "./action_types";
import {GitHubApi} from "../module/github_apis";
import Sort = GitHubApi.Sort;
import SearchTextStore from "../stores/search_store";
import SearchSuccessAction from "./search_success";
import SearchErrorAction from "./search_error";

export interface Action {
  type: ActionTypes
  payload: any
}

const Actions = {
  changeSearchText: (text: string) => {
    dispatch(new ChangeSearchTextAction(text));
    const state = SearchTextStore.getState();
    Actions.searchRepositories(state.text, "", GitHubApi.Sort.match, false);
  },
  searchRepositories: (text: string, lang: string, sort: Sort, isDesc: boolean) => {
    new GitHubApi.Search().word(text).lang(lang).sort(sort).desk(isDesc).get(
        res => dispatch(new SearchSuccessAction(res)),
        err => dispatch(new SearchErrorAction(err))
    )
  },
};
export default Actions