import * as React from "react";
import Repository from "../model/repository";

interface Props {
  repo: Repository
}

export default class RepositoryComponent extends React.Component<Props> {
  render() {
    return(
        <div>
          <p>{this.props.repo.full_name}</p>
          <p>{this.props.repo.description}</p>
          <p>{this.props.repo.updated_at}</p>
          <p>{this.props.repo.language}</p>
          <p>⭐️{this.props.repo.stargazers_count}</p>
          <br/>
        </div>
    )
  }
}