import {Component, OnInit} from '@angular/core';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {Observable, ReplaySubject, Subscription} from 'rxjs';
import {ConfigService} from '../core/config.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {filter, map, mergeMap} from 'rxjs/operators';
import {SimpleReuseStrategy} from '../simple-reuse-strategy';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [SimpleReuseStrategy]
})
export class AdminComponent implements OnInit {
  settings: any;
  onSettingsChanged: Subscription;
  layoutMode = false;
// 路由列表
  menuList: Array<{ title: string, module: string, power: string, isSelect: boolean }> = [];
  private _media$: ReplaySubject<MediaChange> = new ReplaySubject(1);
  private _mediaSubscription: Subscription;

  sidenavOpen: boolean = true;
  sidenavMode: string = 'side';
  sidenavAlign: string = 'start';
  customizerSidenavAlign: string = 'end';

  title = '中后台前端应用框架 - Power by stbui';

  get media$(): Observable<MediaChange> {
    return this._media$.asObservable();
  }

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private titleService: Title,
              media: ObservableMedia, private config: ConfigService) {
    media
      .asObservable()
      .subscribe(
        res => this._media$.next(res),
        err => this._media$.error(err),
        () => this._media$.complete()
      );

    this.onSettingsChanged = this.config.onSettingsChanged.subscribe(
      settings => {
        this.settings = settings;

        if (this.settings.layout.mode === 'boxed') {
          this.layoutMode = true;
        } else {
          this.layoutMode = false;
        }

        if (this.settings.layout.navigation === 'left') {
          this.sidenavAlign = 'start';
          this.customizerSidenavAlign = 'end';
        } else if (this.settings.layout.navigation === 'right') {
          this.sidenavAlign = 'end';
          this.customizerSidenavAlign = 'start';
        } else {
          this.sidenavAlign = 'start';
          this.customizerSidenavAlign = 'end';
          this.sidenavOpen = false;
        }
      }
    );

    // 路由事件
    this.router.events.pipe(filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data))
      .subscribe((event) => {
        console.log(event);
        // 路由data的标题
        let title = event['title'];
        this.menuList.forEach(p => p.isSelect = false);
        var menu = {title: title, module: event['module'], power: event['power'], isSelect: true};
        this.titleService.setTitle(title);
        let exitMenu = this.menuList.find(info => info.title == title);
        if (exitMenu) {// 如果存在不添加，当前表示选中
          this.menuList.forEach(p => p.isSelect = p.title == title);
          return;
        }
        this.menuList.push(menu);
      });
  }

  ngOnInit() {
    this._mediaSubscription = this.media$.subscribe((change: MediaChange) => {
      let isMobile = change.mqAlias === 'xs' || change.mqAlias === 'sm';

      this.sidenavMode = isMobile ? 'over' : 'side';
      this.sidenavOpen = !isMobile;
    });

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 2000);
  }

  /**
   * @param event {Event} 事件
   * @param scrollContainer {Object} 容器dom
   */
  onActivate(event, scrollContainer) {
    scrollContainer.scrollTop = 0;
  }

  // 关闭选项标签
  closeUrl(module: string, isSelect: boolean) {
    // 当前关闭的是第几个路由
    let index = this.menuList.findIndex(p => p.module == module);
    // 如果只有一个不可以关闭
    if (this.menuList.length == 1) return;

    this.menuList = this.menuList.filter(p => p.module != module);
    // 删除复用
    delete SimpleReuseStrategy.handlers[module];
    if (!isSelect) return;
    // 显示上一个选中
    let menu = this.menuList[index - 1];
    if (!menu) {// 如果上一个没有下一个选中
      menu = this.menuList[index + 1];
    }
    // console.log(menu);
    // console.log(this.menuList);
    this.menuList.forEach(p => p.isSelect = p.module == menu.module);
    // 显示当前路由信息
    this.router.navigate(['/' + menu.module]);
  }
}
