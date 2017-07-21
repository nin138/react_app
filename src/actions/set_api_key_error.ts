import {Action} from "./actions";
import {ActionTypes} from "./action_types";
export default class SetApiKeyErrorAction implements Action {
  type = ActionTypes.set_api_key_error;
  constructor(public payload: number) {}
}