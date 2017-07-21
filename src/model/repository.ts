import Owner from "./owner";
export default class Repository {
  static setIsWatchingAll(repos: Array<Repository> ,ids: Array<number>): Array<Repository> {
    return repos.map((repo: Repository) => {
      let f = false;
      ids.forEach(id => {
        if(repo.id == id) f = true
      });
      repo.is_watching = f;
      return repo;
    });
  }
  static setWatching(repos: Array<Repository> ,ids: Array<number>, value: boolean) {
    return repos.map(repo => {
      ids.forEach(id => {
        if(repo.id == id) repo.is_watching = value;
      });
      return repo;
    })
  }

  id: number;
  name: string;
  full_name: string;
  language: string;
  description: string;
  owner: Owner;
  url: string;
  created_at: string;
  updated_at: string;
  forks_count: number;
  stargazers_count: number;
  watchers_count: number;
  is_watching: boolean = false;
  html_url: string;
  constructor(obj?: any, isWatching?: boolean) {
    if(obj) {
      this.id = obj.id;
      this.name = obj.name;
      this.full_name = obj.full_name;
      this.language = obj.language;
      this.description = obj.description;
      this.owner = new Owner(obj.owner);
      this.url = obj.url;
      this.created_at = obj.created_at;
      this.updated_at = obj.updated_at;
      this.forks_count = obj.forks_count;
      this.stargazers_count = obj.stargazers_count;
      this.watchers_count = obj.watchers_count;
      this.html_url = obj.html_url;
    }
    if(isWatching) this.is_watching = true;
  }
}