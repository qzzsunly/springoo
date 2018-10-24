import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpUtilService {

  constructor(private httpClient: HttpClient) {
  }

  getData(url: string) {
    return this.httpClient.get(url);
  }

}
