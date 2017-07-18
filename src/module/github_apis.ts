import Http from "./http";
import Repository from "../model/repository"
export module GitHubApi {

  const BASE_URL = "https://api.github.com/";
  export enum Sort {
    match, stars, forks, updated
  }

  export class SearchResponse {
    constructor(public total_count: number = 0,
                public incomplete_results: boolean = false,
                public repositories: Array<Repository> = []
    ) {}
  }

  export class Search {
    static readonly URL = BASE_URL + "search/repositories?";
    private word_: string = "";
    private lang_: string;
    private sort_: Sort = Sort.match;
    private isDesc = false;
    word(v: string) { this.word_ = v; return this }
    lang(v: string) { this.lang_ = v; return this }
    sort(v: Sort) { this.sort_ = v; return this }
    desk(isDesc: boolean) { this.isDesc = isDesc; return this }

    get(success: (v: SearchResponse) => void, error: (status: number) => void) {
      new Http().url(this.getQuery()).get().then(
          res => {
            if(res.status >= 200 && res.status < 300) {
              const r = JSON.parse(res.body);
              const ret = new SearchResponse(r.total_count, r.incomplete_results, []);
              r.items.forEach((i: any) => {
                ret.repositories.push(new Repository(i))
              });
              success(ret);
            } else error(res.status);
          }
      )
    }
    private getQuery(): string {
      let query = Search.URL;
      const word = `${this.word_.trim()} ${(this.lang_ != null)? "language:" + this.lang_.trim() : ""}`;
      if(word) {
        query += "q=";
        const words = word.trim().split(" ");
        words.forEach(v => query += v + "+");
        if(query.substr(query.length - 1) == '+') query = query.substring(0, query.length - 1);
        if(this.sort_ != Sort.match) query += "&sort=" + Sort[this.sort_];
        if(this.isDesc) query += "&order=desc";
        console.log(query);
        return query;
      }
      return "";
    }
  }
}
