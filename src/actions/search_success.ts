import {Action} from "./actions";
import {ActionTypes} from "./action_types";
import {GitHubApi} from "../module/github_apis";
export default class SearchSuccessAction implements Action {
  type = ActionTypes.search_success;
  constructor(public payload: GitHubApi.SearchResponse) {}
}