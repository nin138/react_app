import {Action} from "./actions";
import {ActionTypes} from "./action_types";
import Repository from "../model/repository";
export default class UnwatchRepositoryAction implements Action {
  type = ActionTypes.unwatch_repository;
  constructor(public payload: Array<Repository>) {}
}