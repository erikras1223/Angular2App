import {
    ChangeDetectorRef,
    Directive,
    Input,
    TemplateRef,
    ViewContainerRef,
    ComponentFactoryResolver,
    ComponentRef,
    IterableDiffer,
    IterableDiffers
} from '@angular/core';

@Directive({
    selector: '[createTab]'
})
export class CreateTab {
    cmpRef: ComponentRef<any>;
    private isViewInitialized: boolean = false;
    private tabComponent: any
    private differ: IterableDiffer<any>

    @Input()
    set createTab(value: any) {
        this.tabComponent = value;
        console.log(this.tabComponent)
    }


    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private cdRef: ChangeDetectorRef,
        private viewContainer: ViewContainerRef, ) { }




    updateComponent() {
        if (!this.isViewInitialized) {
            return;
        }
        if (this.cmpRef) {
            this.cmpRef.destroy();
        }

        let factory = this.componentFactoryResolver.resolveComponentFactory(this.tabComponent);
        this.cmpRef = this.viewContainer.createComponent(factory)
        this.cdRef.detectChanges();
    }

    ngOnChanges() {
        this.updateComponent();
    }

    ngAfterViewInit() {
        this.isViewInitialized = true;
        this.updateComponent();
    }

    ngOnDestroy() {
        if (this.cmpRef) {
            this.cmpRef.destroy();
        }
    }





}