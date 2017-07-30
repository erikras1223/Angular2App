import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Tab } from './tab.component';
import { TabChangeEvent } from './tab-change-event'
import { PrimaryTabContainer } from './primaryTabContainer.component'

@Component({
  selector: 'tabs',
  template: `
    <ul class="nav nav-tabs">
      <li *ngFor="let tab of tabs" (click)="selectTab(tab)" [class.active]="!tab.disable"
        [class.disabled]="tab.disable">
        <a>{{tab.title}}</a>
      </li>
    </ul>
    <ng-content></ng-content>
  `
})
export class Tabs {

  tabs: Tab[];
  activeTabId: number;
  state:string;  

  @Output() tabChange = new EventEmitter<TabChangeEvent>();

  initContent(tabs: Tab[]) {
    this.tabs = tabs;
    // get all active tabs
    let activeTabs = this.tabs.filter((tab) => tab.active);
    if(this.state === PrimaryTabContainer.NEW){
      for(let i = 0; i < tabs.length; i++ ){
        if(i === 0){
          tabs[i].disable = false;
        }
        else{
          tabs[i].disable = true;
        }
        
      }
    }
    
    // if there is no active tab set, activate the first
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs[0]);
    }
  }

  addTab(tab: Tab) {
    this.tabs.push(tab)
  }

  selectTabById(id: number) {
    // need try catch here
    if (id < this.tabs.length && id > -1) {
      this.selectTab(this.tabs[id]);
    }

  }
  selectTab(tab: Tab) {
    // deactivate all tabs
    let selectedTabIndex: number = -1;

    for (let i = 0; i < this.tabs.length; i++) {
      this.tabs[i].active = false;
      if (tab == this.tabs[i]) {
        selectedTabIndex = i;
      }
    }


    if (selectedTabIndex != -1 && !this.tabs[selectedTabIndex].disable &&
      this.activeTabId != selectedTabIndex) {

      let defaultPrevented = false;

      this.tabChange.emit(
        { activeTabId: this.activeTabId, nextId: selectedTabIndex, preventDefault: () => { defaultPrevented = true; } });

      if (!defaultPrevented) {
        this.activeTabId = selectedTabIndex;
        tab.active = true;
      }

    }
    else{
      console.log(this.activeTabId)
      this.tabs[this.activeTabId].active = true;
    }


    // activate the tab the user has clicked on.

  }

}

