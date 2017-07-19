import {Action} from "./actions";
import {ActionTypes} from "./action_types";
import Repository from "../model/repository";
export default class GetWatchingRepositoriesAction implements Action {
  type = ActionTypes.get_watching_repositories;
  constructor(public payload: Array<Repository>) {}
}