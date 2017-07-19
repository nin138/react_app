import {Action} from "./actions";
import {ActionTypes} from "./action_types";
export default class ChangeSearchOrderAction implements Action {
  type = ActionTypes.search_order_change;
  constructor(public payload: boolean) {}
}