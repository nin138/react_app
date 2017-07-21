import {Action} from "./actions";
import {ActionTypes} from "./action_types";
import {GitHubApi} from "../module/github_apis";
import SearchResponse = GitHubApi.SearchResponse;
export default class GetSearchNextAction implements Action {
  type = ActionTypes.get_search_next;
  constructor(public payload: SearchResponse) {}
}