import {Action} from "./actions";
import {ActionTypes} from "./action_types";
import {GitHubApi} from "../module/github_apis";
export default class GetSearchNextErrorAction implements Action {
  type = ActionTypes.get_search_next_error;
  constructor(public payload: GitHubApi.ErrorCodes) {}
}