import {ReduceStore} from 'flux/utils'
import dispatcher from '../dispatcher/dispathcher'
import {Dispatcher} from 'flux';
import {Action} from "../actions/actions";
import API_KEY from "../api_key";



export class ApiKeyStoreState {
  constructor(public isOk = false, public key: string = "") {
  }
}
export class ApiKeyStore extends ReduceStore<ApiKeyStoreState, Action> {
  constructor(dispatcher: Dispatcher<Action>) {
    super(dispatcher);
  }

  getInitialState(): ApiKeyStoreState {
    return new ApiKeyStoreState(true, API_KEY);
  }

  reduce(state: ApiKeyStoreState, action: Action): ApiKeyStoreState {
    switch (action.type) {
      default : return state;
    }
  }

}

const instance = new ApiKeyStore(dispatcher);
export default instance;