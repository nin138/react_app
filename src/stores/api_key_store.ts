import {ReduceStore} from 'flux/utils'
import dispatcher from '../dispatcher/dispathcher'
import {Dispatcher} from 'flux';
import {Action} from "../actions/actions";
import {ActionTypes} from "../actions/action_types";



export class ApiKeyStoreState {
  constructor(public userName: string = "", public key: string = "", public error: boolean = false) {
  }
}
export class ApiKeyStore extends ReduceStore<ApiKeyStoreState, Action> {
  constructor(dispatcher: Dispatcher<Action>) {
    super(dispatcher);
  }

  getInitialState(): ApiKeyStoreState {
    return new ApiKeyStoreState();
  }

  reduce(state: ApiKeyStoreState, action: Action): ApiKeyStoreState {
    switch (action.type) {
      case ActionTypes.set_api_key:
        return new ApiKeyStoreState(action.payload.userName, action.payload.key, false);
      case ActionTypes.set_api_key_error:
        return new ApiKeyStoreState("", "", true);
      default : return state;
    }
  }

}

const instance = new ApiKeyStore(dispatcher);
export default instance;