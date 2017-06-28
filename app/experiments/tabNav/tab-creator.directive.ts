import {
    ChangeDetectorRef,
    Directive,
    Input,
    TemplateRef,
    ViewContainerRef,
    ComponentFactoryResolver,
<<<<<<< HEAD
    ComponentRef
=======
    ComponentRef,
  
>>>>>>> 6eaa3e1a385d944509ce50629bc86b50653243c8
} from '@angular/core';

import {Tab} from './tab.component'

@Directive({
    selector: '[createTab]'
})
export class CreateTab {
    transcludedTabRef: ComponentRef<any>;
    private isViewInitialized: boolean = false;
    private tabComponent: any

    @Input()
    set createTab(value: any) {
        this.tabComponent = value;
        console.log(this.tabComponent)
    }


    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private cdRef: ChangeDetectorRef,
<<<<<<< HEAD
        private viewContainer: ViewContainerRef, private tempRef: TemplateRef<any> ) { }
=======
        private viewContainer: ViewContainerRef ) { }


>>>>>>> 6eaa3e1a385d944509ce50629bc86b50653243c8


    addComponent() {

        if (this.transcludedTabRef) {
            this.transcludedTabRef.destroy();
        }
        

        let compFactory = this.componentFactoryResolver.resolveComponentFactory(this.tabComponent);
        let compRef = this.viewContainer.createComponent(compFactory);
        let tabFactory = this.componentFactoryResolver.resolveComponentFactory(Tab);

        this.transcludedTabRef = this.viewContainer.createComponent(tabFactory,this.viewContainer.length - 1, undefined, [[compRef.location.nativeElement]]);

        this.cdRef.detectChanges();
    }

    ngOnChanges() {
        this.addComponent();
    }

    ngAfterViewInit() {
        this.isViewInitialized = true;
        this.addComponent();
    }

    ngOnDestroy() {
        if (this.transcludedTabRef) {
            this.transcludedTabRef.destroy();
        }
    }


}