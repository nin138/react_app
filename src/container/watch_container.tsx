import * as React from "react"
import {Container, ReduceStore} from 'flux/utils'
import ApiKeyStore from "../stores/api_key_store";

interface State {
  apiKey: string
}
class Watch extends React.Component<{}, State> {
  static getStores(): Array<ReduceStore<any,any>> {
    return [ApiKeyStore]
  }
  static calculateState() {
    return { apiKey: ApiKeyStore.getState().key }
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