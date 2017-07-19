import {ReduceStore} from 'flux/utils'
import dispatcher from '../dispatcher/dispathcher'
import {Dispatcher} from 'flux';
import {Action} from "../actions/actions";
import {API_KEY, USER_NAME} from "../api_key";



export class ApiKeyStoreState {
  constructor(public userName: string = "", public key: string = "") {
  }
}
export class ApiKeyStore extends ReduceStore<ApiKeyStoreState, Action> {
  constructor(dispatcher: Dispatcher<Action>) {
    super(dispatcher);
  }

  getInitialState(): ApiKeyStoreState {
    return new ApiKeyStoreState(USER_NAME, API_KEY);
  }

  reduce(state: ApiKeyStoreState, action: Action): ApiKeyStoreState {
    switch (action.type) {
      default : return state;
    }
  }

}

const instance = new ApiKeyStore(dispatcher);
export default instance;