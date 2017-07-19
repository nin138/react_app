import * as React from "react"
import {Container, ReduceStore} from 'flux/utils'
import ApiKeyStore from "../stores/api_key_store";
import WatchingRepositoriesStore from "../stores/watching_repositories_store";

interface State {
  apiKey: string,
  userName: string,
  repos: string
}
class Watch extends React.Component<{}, State> {
  static getStores(): Array<ReduceStore<any,any>> {
    return [ApiKeyStore, WatchingRepositoriesStore]
  }
  static calculateState() {
    return { apiKey: ApiKeyStore.getState().key, userName: ApiKeyStore.getState().userName, repos: WatchingRepositoriesStore.getState().repos }
  }
  render() {
    return(
        <section>
          <h1>watch</h1>
        </section>
    )
  }
}


const WatchContainer = Container.create(Watch);
export default WatchContainer;