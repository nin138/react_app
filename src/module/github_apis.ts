import Http from "./http";
import Repository from "../model/repository"

export module GitHubApi {
  const BASE_URL = "https://api.github.com/";
  export enum Sort {
    match, stars, forks, updated
  }
  export enum ErrorCodes {
    NO_QUERY, API_KEY_REQUIRED
  }
  export class SearchResponse {
    constructor(public total_count: number = 0,
                public incomplete_results: boolean = false,
                public repositories: Array<Repository> = []) {
    }
  }
  export class Search {
    private static readonly URL = BASE_URL + "search/repositories?";
    private api_key: string;
    private word_: string = "";
    private lang_: string = "";
    private sort_: Sort = Sort.match;
    private isDesc = false;

    word(v: string) { this.word_ = v; return this; }
    lang(v: string) { this.lang_ = v; return this; }
    sort(v: Sort) { this.sort_ = v; return this; }
    desk(isDesc: boolean) { this.isDesc = isDesc; return this; }
    apiKey(key: string) { this.api_key = key; return this; }

    get(success: (v: SearchResponse) => void, error: (status: number) => void) {
      if (this.word_ || this.lang_) {
        console.log(`${Search.URL}q=${this.getQuery()}`);
        new Http().url(`${Search.URL}q=${this.getQuery()}`).get().then(
            res => {
              if (res.status >= 200 && res.status < 300) {
                const r = JSON.parse(res.body);
                const ret = new SearchResponse(r.total_count, r.incomplete_results, []);
                r.items.forEach((i: any) => {
                  ret.repositories.push(new Repository(i))
                });
                success(ret);
              } else error(res.status);//TODO set error code
            }
        )
      } else error(ErrorCodes.NO_QUERY);
    }

    private getQuery(): string {
      let query = "";
      const word = `${this.word_.trim()} ${(this.lang_) ? "language:" + this.lang_.trim() : ""}`;
      if (word) {
        const words = word.trim().split(" ");
        words.forEach(v => query += v + "+");
        if (query.substr(query.length - 1) == '+') query = query.substring(0, query.length - 1);
        if (this.sort_ != Sort.match) query += "&sort=" + Sort[this.sort_];
        if (!this.isDesc) query += "&order=asc";
        if (this.api_key) query += `&access_token=${this.api_key}`;
        return query;
      }
      return "";
    }
  }

  export module User {
    export class Watching{
      private static readonly URL = BASE_URL + "user/";
      private key_: string;
      key(key: string) { this.key_ = key; return this; }
      get(success: (res: Array<Repository>) => void, error: (code: ErrorCodes) => void) {
        if (this.key_) {
          new Http().url(`${Watching.URL}subscriptions?access_token=${this.key_}`).get().then(
              res => {
                if (res.status >= 200 && res.status < 300) {
                  const r: Array<any> = JSON.parse(res.body);
                  success(r.map((v) => new Repository(v, true)));
                } else error(res.status);//TODO set error code
              }
          )
        } else error(ErrorCodes.API_KEY_REQUIRED);
      }
    }
  }
  export module Repo {
    export class Watch {
      private static readonly URL = BASE_URL + "repos/";
      private key_: string;
      private owner_: string;
      private repo_: string;
      key(key: string) { this.key_ = key; return this; }
      owner(owner: string) { this.owner_ = owner; return this; }
      repo(repo: string) { this.repo_ = repo; return this; }
      subscribe(success: (full_name: string) => void, err: (code: ErrorCodes) => void) { this.request(success, err, "PUT", { subscribed: true }) }
      ignore(success: (full_name: string) => void, err: (code: ErrorCodes) => void) { this.request(success, err, "PUT", { ignored: false }) }
      unwatch(success: (full_name: string) => void, err: (code: ErrorCodes) => void) { this.request(success, err, "DELETE") }
      private request(success: (full_name: string) => void, err: (code: ErrorCodes) => void, method: string, data?: object) {
        if(!this.key_) err(ErrorCodes.API_KEY_REQUIRED);
        else if(!this.owner_ || !this.repo_) err(ErrorCodes.NO_QUERY);
        else {
          new Http()
              .url(`${Watch.URL}${this.owner_}/${this.repo_}/subscription?access_token=${this.key_}`)
              .data(JSON.stringify(data))
              .request(method)
              .then(
                  res => {
                    if (res.status >= 200 && res.status < 300) {
                      success(`${this.owner_}/${this.repo_}`)
                    } else err(res.status);//TODO set error code
                  }
              )
        }
      }
    }
  }

}