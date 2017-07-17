import { dispatch } from "../dispatcher/dispathcher"
import ChangeSearchTextAction from "./change_search_text";
import {ActionTypes} from "./action_types";

export interface Action {
  type: ActionTypes
}

const Actions = {
  changeSearchText: (text: string) => dispatch(new ChangeSearchTextAction(text)),
  searchRepositories: (query: string) => {

  }
};
export default Actions