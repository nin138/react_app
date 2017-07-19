import {Action} from "./actions";
import {ActionTypes} from "./action_types";
export default class WatchRepositoryAction implements Action {
  type = ActionTypes.watch_repository;
  constructor(public payload: string) {}
  //payload is repository full_name
}