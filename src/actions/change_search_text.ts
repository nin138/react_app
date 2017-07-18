import { Action } from "./actions";
import {ActionTypes} from "./action_types";
export default class ChangeSearchTextAction implements Action {
  type = ActionTypes.search_text_change;
  constructor(public payload: string) {}
}