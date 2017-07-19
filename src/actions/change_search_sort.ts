import {Action} from "./actions";
import {ActionTypes} from "./action_types";
import {GitHubApi} from "../module/github_apis";
export default class ChangeSearchSortAction implements Action {
  type = ActionTypes.search_sort_change;
  constructor(public payload: GitHubApi.Sort) {}
}