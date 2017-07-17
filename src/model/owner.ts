export default class Owner {
  constructor(obj?: any) {
    if(obj) {
      this.login = obj.login;
      this.id = obj.id;
      this.avatar_url = obj.avatar_url;
      this.gravatar_id = obj.gravatar_id;
      this.url = obj.url;
    }
  }
  login: string;
  id: number;
  avatar_url: string;
  gravatar_id: string;
  url: string;
}
