import { Injectable, EventEmitter } from '@angular/core'
import { Subject, Observable } from 'rxjs/RX'
import { Http, Response, Headers, RequestOptions } from '@angular/http'



@Injectable()
export class ExperimentsService {

    private tabList:Array<string> = ["PrepSetupTab","FinalizeTab"]

  constructor(private http: Http){}

  getTabs():Observable<Array<string>> {
    let subject = new Subject<Array<string>>()
    setTimeout(() => {subject.next(this.tabList); subject.complete(); }, 100)
    return subject // simulating asyn data from backend
  }
  addTab(tabName:string):void{
    this.tabList.push(tabName);
  }

  

}

 