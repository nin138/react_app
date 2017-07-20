import * as React from "react";
import Repository from "../model/repository";
import Actions from "../actions/actions";

interface Props {
  repo: Repository
}

export default class RepositoryComponent extends React.Component<Props> {
  render() {
    const watchButton = this.props.repo.is_watching ?
        (<button className="c-repository__body__btn c-repository__btn--watch" onClick={() => Actions.unwatchRepository(this.props.repo)}>
          unwatch</button>) :
        (<button className="c-repository__body__btn c-repository__body__btn--unwatch" onClick={() => Actions.watchRepository(this.props.repo)}>
          watch</button>);
    const lang = this.props.repo.language ? (<div className="c-repository__body__lang">{this.props.repo.language}</div>) : "";
    return (
        <div className="c-repository">
          <div className="c-repository__head">
            <h2 className="c-repository__head__title">{this.props.repo.full_name}</h2>
            <p className="c-repository__star">️⭐{this.props.repo.stargazers_count}</p>
          </div>
          <p className="c-repository__updated">{"updated at " + this.props.repo.updated_at.substring(0, 10).replace(/-/g, '/')}</p>
          <div className="c-repository__body">
            {lang}
            <p className="c-repository__body__description">{this.props.repo.description}</p>
            {watchButton}
          </div>
        </div>
    )
  }
}