import * as React from "react";
import Repository from "../model/repository";
import WatchingRepositoryComponent from "./watching_repository";

interface Props {
  repos: Array<Repository>
}

export default class WatchingReposAreaComponent extends React.Component<Props> {
  render() {
    console.log(this.props.repos);
    const list = this.props.repos.map((r: Repository) => { return(<WatchingRepositoryComponent key={r.id} repo={r} />) });
    return(
        <div>
          { list }
        </div>

    )
  }
}