import { Component, EventEmitter,Output,Input } from '@angular/core';
import { Tab } from './tab.component';
import {TabChangeEvent} from './tab-change-event'

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
  @Input() activeTabId:number;
  @Output() tabChange = new EventEmitter<TabChangeEvent>();

  initContent(tabs: Tab[]) {
    this.tabs = tabs;
    // get all active tabs
    let activeTabs = this.tabs.filter((tab)=>tab.active);

    // if there is no active tab set, activate the first
    if(activeTabs.length === 0) {
      this.selectTab(this.tabs[0]);
    }
  }

  addTab(tab:Tab){
    this.tabs.push(tab)
  }

  selectTab(tab: Tab, id?:number){
    // deactivate all tabs
    let selectedTabIndex:number = -1;

    for(let i = 0; i < this.tabs.length; i ++){
      this.tabs[i].active = false;
      if(tab == this.tabs[i]){
        selectedTabIndex = i;
      }
    }
    //this.tabs.forEach(tab => tab.active = false);
    let defaultPrevented = false;
    this.tabChange.emit(
          {activeTabId: this.activeTabId, nextId: selectedTabIndex, preventDefault: () => { defaultPrevented = true; }});
    // activate the tab the user has clicked on.
    if(!defaultPrevented){
      this.activeTabId =selectedTabIndex;
      tab.active = true;
    }else{
      this.tabs[this.activeTabId].active = true;
    }
  }

}

