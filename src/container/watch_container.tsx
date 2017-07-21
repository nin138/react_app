import * as React from "react"
import {Container, ReduceStore} from 'flux/utils'
import ApiKeyStore, {ApiKeyStoreState} from "../stores/api_key_store";
import WatchingRepositoriesStore, {WatchingRepositoriesState} from "../stores/watching_repositories_store";
import WatchingReposAreaComponent from "../component/watching_repos_area";
import WatchContainerHeader from "../component/watch_container_header";

interface State {
  keys: ApiKeyStoreState
  watching: WatchingRepositoriesState
}
class Watch extends React.Component<{}, State> {
  static getStores(): Array<ReduceStore<any,any>> {
    return [ApiKeyStore, WatchingRepositoriesStore]
  }
  static calculateState(): State {
    return { keys: ApiKeyStore.getState(), watching: WatchingRepositoriesStore.getState() }
  }
  render() {
    return(
        <section className="l-watch-container">
          <WatchContainerHeader keys={this.state.keys} />
          <WatchingReposAreaComponent repos={this.state.watching.repos} />
        </section>
    )
  }
}


const WatchContainer = Container.create(Watch);
export default WatchContainer;