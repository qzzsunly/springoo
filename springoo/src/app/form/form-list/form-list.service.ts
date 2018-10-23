import { Injectable } from '@angular/core';
import {HttpUtilService} from '../../core/http-util.service';

@Injectable({
  providedIn: 'root'
})
export class FormListService {

  private dataStore;

  private httpUtil;

  get data() {
    return this.dataStore;
  }

  constructor(httpUtil: HttpUtilService) {
    this.httpUtil = httpUtil;
  }

  select(options?) {
    const d = [
      { id: '1', name: 'demo' }
    ];
    this.dataStore = d;
    return this.httpUtil.getData('form/list');
  }

  add(data) {
    let newData = Object.assign(this.getLastId(), data);
    this.dataStore.push(newData);
  }

  find(data) {
  }

  update(data) {
  }

  delete(data) {
    let result = this.dataStore.filter((v, k) => {
      if(v.id == data.id) {
        return v;
      }
    });

    const i = this.dataStore.indexOf(result[ 0 ]);
    this.dataStore = [
      ...this.dataStore.slice(0, i),
      ...this.dataStore.slice(i + 1)
    ];
  }

  count() {
    return this.dataStore.length;
  }

  where() {
  }

  getLastId() {
    let pop = this.dataStore.pop();
    let id = pop.id;

    return { id };
  }
}
