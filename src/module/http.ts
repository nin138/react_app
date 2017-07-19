import * as popsicle from "popsicle"
import {Response} from "popsicle/dist/response";
import {RequestOptions} from "popsicle/dist/request";

class RequestOps implements RequestOptions{
  constructor(
      public method: string,
      public url: string,
      public body: any,
      public headers: any
  ) {}
}



export default class Http {
  private url_: string;
  private data_: any;
  private headers = {
    'Content-Type': "application/x-www-form-urlencoded"
  };
  url(url: string) { this.url_ = url; return this }
  data(data: any) { this.data_ = data; return this }
  get(): Promise<Response> { return this.request("GET"); }
  post(): Promise<Response> { return this.request("POST"); }
  request(method: string): Promise<Response> {
    const req = new RequestOps(method, this.url_, this.data_, this.headers);
    return popsicle.request(req)._promise
  }
}
