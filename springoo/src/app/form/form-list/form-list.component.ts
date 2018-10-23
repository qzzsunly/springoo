import {Component, OnInit} from '@angular/core';
import {FormListService} from './form-list.service';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss']
})
export class FormListComponent implements OnInit {
  columns;
  data;

  constructor(private formListService: FormListService) {

    this.columns = [
      {
        title: '名称',
        key: 'name',
      },
      {
        title: '表单key',
        key: 'form_key',
      },
      {
        title: '分类',
        key: 'type_name',
      },
      {
        title: '状态',
        key: 'status',
      },
      {
        title: '版本信息',
        key: 'version',
      },
      {
        title: '操作',
        key: 'op',
      }
    ];
    console.log(this.columns);

  }

  ngOnInit() {
    this.formListService.select().subscribe(data => this.data  = data.rows);
  }


}
