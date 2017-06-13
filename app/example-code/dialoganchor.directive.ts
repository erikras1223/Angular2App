import {Directive, ComponentFactoryResolver, ComponentFactory, ComponentRef} from '@angular/core';

import {ViewContainerRef} from '@angular/core';
import {Dialog} from './dialog.component';

@Directive({ 
  selector: '[dialogAnchor]'
})
export class DialogAnchorDirective {
    constructor(
        private viewContainer: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {}

    createDialog(dialogComponent: { new(): Dialog }): ComponentRef<Dialog> {
        this.viewContainer.clear();

        let dialogComponentFactory = 
          this.componentFactoryResolver.resolveComponentFactory(dialogComponent);
        let dialogComponentRef = this.viewContainer.createComponent(dialogComponentFactory);
        
        dialogComponentRef.instance.close.subscribe(() => {
            console.log("I am the anchor destory")
            dialogComponentRef.destroy();
        });

        return dialogComponentRef;
    }
}