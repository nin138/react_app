import * as React from "react";
import Actions from "../actions/actions";
import {ApiKeyStoreState} from "../stores/api_key_store";



interface Props {
  keys: ApiKeyStoreState;
}

export default class WatchContainerHeader extends React.Component<Props> {
  componentDidMount() {
    const inpLang = document.getElementById("input-lang");
    if(inpLang != null) {
      inpLang.setAttribute("autocomplete", "on");
      inpLang.setAttribute("list", "lang-list");
    }

  }
  render() {
    const user = this.props.keys.userName ? (<h2 className="l-watch-container__header__h2">sign in as {this.props.keys.userName}</h2>) : "";
    const err = this.props.keys.error ? (<span className="l-watch-container__header__error-msg">error: invalid api key</span>) : "";
    return(
        <div className="l-watch-container__header">
          <h1 className="l-watch-container__header__h1">Watching Repositories</h1>
          {user}
          <label>api key:
            <input onChange={(e) => this.handleApiKeyChange(e)} className="l-watch-container__header__input" type="text"/>
            {err}
          </label>
        </div>
    )
  }
  handleApiKeyChange(e: React.FormEvent<HTMLInputElement>) {
    Actions.setApiKey(e.currentTarget.value)
  }
}