import { Directive, OnInit, Inject, ElementRef, Input } from '@angular/core'
import { JQ_TOKEN } from './jQuery.service'

/*
    This directive is adding a wrapper to the jQuery modal that will be triggered when
    the search button in nav.component.html is fired.
*/

@Directive({
  selector: '[modal-trigger]' // special for directive syntax designating its a attribute not a element
})
export class ModalTriggerDirective implements OnInit {
  private el: HTMLElement;
  @Input('modal-trigger') modalId: string; // the directive/attribute value being assigned to modalId

  constructor(ref: ElementRef, @Inject(JQ_TOKEN) private $: any) { // ref is the element that the directive(modalTrigger)                                                               
    this.el = ref.nativeElement;                                   // is on, in this case the button
  }

  ngOnInit() { // simpleModal.component has in its div an  id="{{elementId}}""
    this.el.addEventListener('click', e => {
      this.$(`#${this.modalId}`).modal({}) // making listener that is listening for the search button to be clicked
    })
  }
}