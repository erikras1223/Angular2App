import { Component } from '@angular/core';
import { Tab } from './tab.component';

@Component({
  selector: 'tabs',
  template:`
    <ul class="nav nav-tabs">
      <li *ngFor="let tab of tabs" (click)="selectTab(tab)" [class.active]="tab.active">
        <a>{{tab.title}}</a>
      </li>
    </ul>
    <ng-content></ng-content>
  `
})
export class Tabs  {

  tabs: Tab[];

  initContent(tabs: Tab[]) {
    this.tabs = tabs;
    // get all active tabs
    let activeTabs = this.tabs.filter((tab)=>tab.active);

    // if there is no active tab set, activate the first
    if(activeTabs.length === 0) {
      this.selectTab(this.tabs[0]);
    }
  }

  selectTab(tab: Tab){
    // deactivate all tabs
    this.tabs.forEach(tab => tab.active = false);

    // activate the tab the user has clicked on.
    tab.active = true;
  }

}

