import {Action} from "./actions";
import {ActionTypes} from "./action_types";
import {GitHubApi} from "../module/github_apis";
export default class UnwatchRepositoryErrorAction implements Action {
  type = ActionTypes.unwatch_repository_error;
  constructor(public payload: GitHubApi.ErrorCodes) {}
}