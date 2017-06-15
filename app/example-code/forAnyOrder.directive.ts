
import {
  ChangeDetectorRef,
  Directive,
  IterableDiffer,
  IterableDiffers,
  Input,
  TemplateRef,
  ViewContainerRef,
  ViewRef
} from '@angular/core';


/* This directive doesn't care about the order of the list it hold like ngFor
 which can help when for graphic things in your css. It does detect when you add
 and remove item from list or add an item.
 
 This usage can be found on event-list.component.ts file 
  */

@Directive({
  selector: '[forAnyOrder]'
})
export class ForAnyOrder {
    private collection: any
    private differ:IterableDiffer<any> // differ can tell changes in iterable list
    private viewMap:Map<any,ViewRef> = new Map<any,ViewRef>();

    constructor(private differs:IterableDiffers,
                private changeDetector:ChangeDetectorRef,
                private viewContainer:ViewContainerRef,
                private template:TemplateRef<any>){}

   @Input()
    set forAnyOrderOf(value:any){
        this.collection = value;
        if(value && !this.differ ){
            this.differ = this.differs.find(value).create(this.changeDetector); // prereq to use
                                                            
        }
     }

    ngDoCheck():void {
        /* <ng-template ForAnyOrder let-event [forAnyOrderOf]=events >
                <div some template that uses event > </div>
            </ng-template>

            and the equalivent is:

             <div *forAnyOrder="let event of events" class="col-md-5">
                <event-thumbnail [event]="event"></event-thumbnail>
             </div>

        First thing to understand is the forAnyOrderOf is bound with the events data
        the let-event is named "$implicit" which is a context variable. Context are internal
        info that you can access from the view.
        */ 

        if (this.differ) {
            let changes = this.differ.diff(this.collection);
            if (changes) {
            
                changes.forEachAddedItem((change:any) => {
                    let view = this.viewContainer.createEmbeddedView(this.template);
                    view.context.$implicit = change.item; // the special code this is how
                                                          // how the list know what item is
                                                        
                    this.viewMap.set(change.item, view);
                });
                changes.forEachRemovedItem((change) => {
                    let view = this.viewMap.get(change.item);
                    let idx = this.viewContainer.indexOf(view);
                    this.viewContainer.remove(idx);
                    this.viewMap.delete(change.item);
                });
            }
        }
    }

}