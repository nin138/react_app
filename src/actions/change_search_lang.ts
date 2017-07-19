import {Action} from "./actions";
import {ActionTypes} from "./action_types";
export default class ChangeSearchLangAction implements Action {
  type = ActionTypes.search_lang_change;
  constructor(public payload: string) {}
}