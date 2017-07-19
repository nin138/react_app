import {Action} from "./actions";
import {ActionTypes} from "./action_types";
export default class UnwatchRepositoryAction implements Action {
  type = ActionTypes.unwatch_repository;
  constructor(public payload: string) {}
  //payload is repository full_name
}