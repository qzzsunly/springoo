import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';

@Component({
  selector: 'app-bo-edit1',
  templateUrl: './edit.component.html',
})
export class BoDefEditComponent implements OnInit {
  id = this.route.snapshot.params.id;
  i: any;
  schema: SFSchema = {
    properties: {
      alias: { type: 'string', title: '名称' },
      desc: { type: 'string', title: '描述', maxLength: 15 },
      status: {
        type: 'boolean', title: '是否可用', ui: {
          widget: 'checkbox',
        },
        default: true,
      },
      supportDb: {
        type: 'boolean', title: '支持数据库', ui: {
          widget: 'checkbox',
        },
        default: true,
      },
    },
    required: ['alias', 'desc', 'status', 'supportDb'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
    },
    $no: {
      widget: 'text',
    },
    $href: {
      widget: 'string',
    },
    $description: {
      widget: 'textarea',
      grid: { span: 24 },
    },
  };

  constructor(
    private route: ActivatedRoute,
    public location: Location,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
  ) {
  }

  ngOnInit(): void {
    if (this.id > 0)
      this.http.get(`api/bo/def/get/${this.id}`).subscribe(res => (this.i = res));
  }

  save(value: any) {
    this.http.post(`api/bo/def/save/${this.id}`, value).subscribe(res => {
      this.msgSrv.success('保存成功');
    });
  }
}
