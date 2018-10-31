import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { BoDefEditComponent } from './edit/edit.component';

@Component({
  selector: 'app-bo-def',
  templateUrl: './def.component.html',
})
export class BoDefComponent implements OnInit {
  url = `api/bo/def/list`;
  searchSchema: SFSchema = {
    properties: {
      no: {
        type: 'string',
        title: '编号'
      }
    }
  };
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    { title: '名称', index: 'alias' },
    { title: '描述',  index: 'desc' },
    { title: '是否发布', type: 'yn', index: 'deployed' },
    {
      title: '操作',
      buttons: [
        { text: '查看', click: (item: any) => `/bo/def/view/${item.id}` },
        { text: '编辑', click: (item: any) => `/bo/def/edit/${item.id}`},
      ]
    }
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper) { }

  ngOnInit() { }

  add() {
    this.modal
      .createStatic(BoDefEditComponent, { i: {} })
      .subscribe(() => this.st.reload());
  }

}
