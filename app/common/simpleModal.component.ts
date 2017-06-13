import { Component, Input, ViewChild, ElementRef, Inject } from '@angular/core'
import { JQ_TOKEN } from './jQuery.service'

@Component({
  selector: 'simple-modal',
  template: `
  <div id="{{elementId}}" #modalcontainer class="modal fade" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
          <h4 class="modal-title">{{title}}</h4>
        </div>
        <div class="modal-body" (click)="closeModal()">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  </div>
  `,
  styles: [`
    .modal-body { height: 250px; overflow-y: scroll; }
  `]
})
export class SimpleModalComponent {
  @Input() title: string;
  @Input() elementId: string;
  @Input() closeOnBodyClick: string;
  @ViewChild('modalcontainer') containerEl: ElementRef; // 'modalcontainer has reference to the div element above

 constructor(@Inject(JQ_TOKEN) private $: any) {}

 /* Viewchild gets reference to the element by #someValue sytanx. If you wanted access to the ngcontent of this modal you
    would need to import ContentChild. Say for instance I wanted the content in navbar.component.ts I would have to put
    the # on the element I want control of.

  */

  closeModal() {
    if(this.closeOnBodyClick.toLocaleLowerCase() === "true") {
      this.$(this.containerEl.nativeElement).modal('hide');
    } 
  }
}