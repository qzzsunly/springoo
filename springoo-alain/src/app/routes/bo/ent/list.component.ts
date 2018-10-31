import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';

@Component({
  selector: 'app-bo-ent-list',
  templateUrl: './list.component.html',
})
export class BoEntListComponent implements OnInit {
  url = `api/bo/ent/list`;
  searchSchema: SFSchema = {
    properties: {
      'Q^name^SL': {
        type: 'string',
        title: '名称'
      },
      'Q^desc^SL': {
        type: 'string',
        title: '描叙'
      }
    }
  };

  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    { title: '编号', index: '${idx}' },
    { title: '名称', index: 'name' },
    { title: '描叙',  index: 'desc' },
    { title: '是否生成表', type: 'yn', index: 'isCreateTable' },
    { title: '是否外部表', type: 'yn', index: 'isExternal' },
    { title: '可用', index: 'status' },
    { title: '数据源', index: 'dsName' },
    { title: '表名 ', index: 'tableName' },
    {
      title: '操作',
      buttons: [
        { text: '查看', click: (item: any) => `/form/${item.id}` },
        // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
      ]
    }
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper) { }

  ngOnInit() { }

  add() {
    /*this.modal
      .createStatic(FormEditComponent, { i: { id: 0 } })
      .subscribe(() => this.st.reload());*/
  }

}
