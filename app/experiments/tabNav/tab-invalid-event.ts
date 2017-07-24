import {Tab} from './tab.component'

export interface TabInvalidEvent {
  //disableProceedingTabs: () => void
  disableSpecificTabs: (start?:number, end?:number) => void
  tabId:number;
  tabLength:number;
  //tabAction?:any;
}