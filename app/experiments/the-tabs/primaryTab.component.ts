import { Component, EventEmitter, Output, Input } from '@angular/core'
import { Router } from '@angular/router'
import { FormGroup, FormBuilder,FormArray, Validators, AbstractControl } from '@angular/forms'
import { CommonModule } from '@angular/common'

@Component({

    selector: 'prep-tab',
    template: `
              <div> something </div>
    `
})
export class PrimaryTab {
    name: string
    @Output() invalidTab = new EventEmitter<any>();
    private _theForm: FormGroup;

    //private childForms:FormArray;

    constructor(protected fb: FormBuilder) {
        this.name = "A Nameless Tab"; // the value is garbage will fix later doesn't cause any exceptions at this time
    }

    public set theForm(value: FormGroup) {
        console.log("I am the parent")
        this._theForm = value;
        //this.childForms = (<FormArray>this.theForm.root).controls["childForms"];
    }
    public get theForm() {
        return this._theForm;
    }
    protected addChildToForm(childForm:FormGroup):void{
        const childForms = (<FormArray>this.theForm.root).controls["childForms"];
        childForms.push(childForm);
    }

    protected validateControl(value:any,address:string){
        const childForms = (<FormArray>this.theForm.root).controls["childForms"];
        let control: AbstractControl
        for(let i = 0; i < childForms.length; i++){
           control= childForms.at(i).get("age");
           if(control && !!control.validator){
               control.setValue("loook here chippy");
               break;
           }
        }
        console.log(control)

    }
    protected controlsToLink(address:string, control: AbstractControl):void{
            control.valueChanges.subscribe(value => this.validateControl(value,address))
    }

}