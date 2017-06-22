import {
    ChangeDetectorRef,
    Directive,
    Input,
    TemplateRef,
    ViewContainerRef,
    ComponentRef
} from '@angular/core';

@Directive({
    selector: '[createTab]'
})
export class CreateTab {
    cmpRef: ComponentRef<any>;
    private isViewInitialized: boolean = false;
    private tabCollection: Array<any>

    @Input()
    set createTabOf(value: any) {

    }


    constructor(private changeDetector: ChangeDetectorRef,
        private viewContainer: ViewContainerRef, ) { }




    updateComponent() {
        if (!this.isViewInitialized) {
            return;
        }
        if (this.cmpRef) {
            this.cmpRef.destroy();
        }
    
        /*
        let factory = this.componentFactoryResolver.resolveComponentFactory(this.type);
        this.cmpRef = this.target.createComponent(factory)
        // to access the created instance use
        // this.compRef.instance.someProperty = 'someValue';
        // this.compRef.instance.someOutput.subscribe(val => doSomething());
        this.cdRef.detectChanges();*/
    }





}