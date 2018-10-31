import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';

@Component({
  selector: 'app-form-def',
  templateUrl: './def.component.html',
})
export class FormDefComponent implements OnInit {
  url = `api/form/def/list`;
  searchSchema: SFSchema = {
    properties: {
      'Q^name^SL': {
        type: 'string',
        title: '名称',
      }
    }
  };
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    { title: '名称', index: 'name' },
    { title: '别名', index: 'key' },
    {
      title: '业务对象', index: 'boDefList', format: function(cell, row) {
        let boDefList = cell.boDefList;
        let rtn = [];
        for (let i = 0; i < boDefList.length; i++) {
          let title = boDefList[i].supportDB == '1' ? '支持表' : '不支持表';
          let r = '<span title="' + title + '">' + boDefList[i].desc + '</span>';
          rtn.push(r);
        }
        return rtn.join('，');
      },
    },
    { title: '分类', index: 'type' },
    {
      title: '',
      buttons: [
        // { text: '查看', click: (item: any) => `/form/${item.id}` },
        // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
      ],
    },
  ];


  constructor(private http: _HttpClient, private modal: ModalHelper) {
  }

  ngOnInit() {
  }

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }

}
