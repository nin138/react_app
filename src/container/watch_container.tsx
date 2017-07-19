import * as React from "react"
import {Container, ReduceStore} from 'flux/utils'
import ApiKeyStore from "../stores/api_key_store";
import WatchingRepositoriesStore from "../stores/watching_repositories_store";
import WatchingReposAreaComponent from "../component/watching_repos_area";
import Repository from "../model/repository";

interface State {
  apiKey: string,
  userName: string,
  repos: Array<Repository>
}
class Watch extends React.Component<{}, State> {
  static getStores(): Array<ReduceStore<any,any>> {
    return [ApiKeyStore, WatchingRepositoriesStore]
  }
  static calculateState(): State {
    return { apiKey: ApiKeyStore.getState().key, userName: ApiKeyStore.getState().userName, repos: WatchingRepositoriesStore.getState().repos }
  }
  render() {
    return(
        <section>
          <h1>watch</h1>
          <WatchingReposAreaComponent repos={this.state.repos} />
        </section>
    )
  }
}


const WatchContainer = Container.create(Watch);
export default WatchContainer;