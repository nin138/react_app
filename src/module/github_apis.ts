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
      private static readonly URL = BASE_URL + "users";
      private userName_: string;
      private key_: string;
      userName(userName: string) { this.userName_ = userName; return this; }
      key(key: string) { this.key_ = key; return this; }

      get(success: (res: Array<Repository>) => void, error: (code: ErrorCodes) => void) {
        if (this.userName_ || this.key_) {
          new Http().url(`${Watching.URL}/${this.userName_}/subscriptions?access_token=${this.key_}`).get().then(
              res => {
                if (res.status >= 200 && res.status < 300) {
                  const r: Array<any> = JSON.parse(res.body);
                  success(r.map((v) => new Repository(v)));
                } else error(res.status);//TODO set error code
              }
          )
        } else error(ErrorCodes.API_KEY_REQUIRED);
      }
    }
  }
}