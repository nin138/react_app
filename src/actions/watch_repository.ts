import {Action} from "./actions";
import {ActionTypes} from "./action_types";
import Repository from "../model/repository";
export default class WatchRepositoryAction implements Action {
  type = ActionTypes.watch_repository;
  constructor(public payload: Array<Repository>) {}
}