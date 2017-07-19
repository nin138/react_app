import * as React from "react";
import Repository from "../model/repository";
import RepositoryComponent from "./repository";

interface Props {
  repos: Array<Repository>
}

export default class WatchingReposAreaComponent extends React.Component<Props> {
  render() {
    const list = this.props.repos.map((r: Repository) => { return(<RepositoryComponent key={r.id} repo={r} />) });
    return(
        <div>
          { list }
        </div>

    )
  }
}