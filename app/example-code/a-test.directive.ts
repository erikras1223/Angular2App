import {AfterViewInit, Component, Directive, Input, QueryList, ViewChildren} from '@angular/core';

/*
  The click triggers a boolean which the ngIf will remove the element off the dom and if true adds it to the dom
  The QueryList tracks change to list of its dom elements (pane element). It emits change and the observable listens to it
*/



@Directive({selector: 'pane'})
export class Pane {
  @Input() id: string;
}
@Component({
  selector: 'example-app',
  template: `
    <pane id="1">I am panel one </pane>
    <pane id="2">I am panel 2</pane>
    <pane id="3" *ngIf="shouldShow"> I am optional </pane>
    <button (click)="show()">Show 3</button>
    <div>panes: {{serializedPanes}}</div> 
  `,
})
export class ViewChildrenComp implements AfterViewInit {
  @ViewChildren(Pane) panes: QueryList<Pane>;
  serializedPanes: string = 'LOok at this';
  shouldShow = false;
  show() { this.shouldShow = false; }
  ngAfterViewInit() {
    this.calculateSerializedPanes();
    this.panes.changes.subscribe((r) => { this.calculateSerializedPanes(); });
  }
  calculateSerializedPanes() {
    setTimeout(() => { this.serializedPanes = this.panes.map(p => p.id).join(', '); }, 0);
  }
}
