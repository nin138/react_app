import { Action } from "./actions";
import {ActionTypes} from "./action_types";
export default class SearchErrorAction implements Action {
  type = ActionTypes.search_error;
  constructor(public payload: number) {}
}