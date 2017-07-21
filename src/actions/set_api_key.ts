import {Action} from "./actions";
import {ActionTypes} from "./action_types";
export default class SetApiKeyAction implements Action {
  type = ActionTypes.set_api_key;
  constructor(public payload: {key: string, userName: string}) {}
}