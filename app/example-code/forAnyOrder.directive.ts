
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

@Directive({
  selector: '[forAnyOrder]'
})
export class ForAnyOrder {
    private collection: any
    private differ:IterableDiffer
    private viewMap:Map<any,ViewRef> = new Map<any,ViewRef>();

    constructor(private differs:IterableDiffers,
                private changeDetector:ChangeDetectorRef,
                private viewContainer:ViewContainerRef,
                private template:TemplateRef<any>){}

   @Input()
    set forAnyOrderOf(value:any){
        this.collection = value;
        if(value && !this.differ ){
            this.differ = this.differs.find(value).create(this.changeDetector);
        }
     }

    ngDoCheck():void {
        if (this.differ) {
            let changes = this.differ.diff(this.collection);
            if (changes) {
            
                changes.forEachAddedItem((change) => {
                    let view = this.viewContainer.createEmbeddedView(this.template);
                    view.context.$implicit = change.item;
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