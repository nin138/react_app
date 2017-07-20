import * as React from "react";
import Repository from "../model/repository";
import Actions from "../actions/actions";

interface Props {
  repo: Repository
}

export default class WatchingRepositoryComponent extends React.Component<Props> {
  render() {
    const watchButton = this.props.repo.is_watching ?
        (<button onClick={() => Actions.unwatchRepository(this.props.repo)}>unwatch</button>) :
        (<button onClick={() => Actions.watchRepository(this.props.repo)}>watch</button>);
    return(
        <div>
          <p>{this.props.repo.full_name}</p>
          <p>{this.props.repo.description}</p>
          <p>{this.props.repo.updated_at.substring(0, 10).replace(/-/g, '/')}</p>
          <p>{this.props.repo.language}</p>
          <p>⭐️{this.props.repo.stargazers_count}</p>
          <br/>
          {watchButton}
        </div>
    )
  }
}