import {
    ChangeDetectorRef,
    Directive,
    Input,
    TemplateRef,
    ViewContainerRef,
    ComponentFactoryResolver,
    ComponentRef
} from '@angular/core';

@Directive({
    selector: '[createTab]'
})
export class CreateTab {
    cmpRef: ComponentRef<any>;
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
        private viewContainer: ViewContainerRef, private tempRef: TemplateRef<any> ) { }


    updateComponent() {
        if (!this.isViewInitialized) {
            return;
        }
        if (this.cmpRef) {
            this.cmpRef.destroy();
        }
        

        let factory = this.componentFactoryResolver.resolveComponentFactory();
        this.cmpRef = this.viewContainer.createComponent()
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