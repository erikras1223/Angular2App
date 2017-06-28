import {
    ChangeDetectorRef,
    Directive,
    Input,
    TemplateRef,
    ViewContainerRef,
    ComponentFactoryResolver,
    ComponentRef,
  
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
        private viewContainer: ViewContainerRef ) { }




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