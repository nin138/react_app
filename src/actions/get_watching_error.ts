import {Action} from "./actions";
import {ActionTypes} from "./action_types";
import {GitHubApi} from "../module/github_apis";
export default class GetWatchingErrorAction implements Action {
  type = ActionTypes.get_watching_error;
  constructor(public payload: GitHubApi.ErrorCodes) {}
}