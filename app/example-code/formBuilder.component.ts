import { Component, OnInit,AfterViewInit, Output,EventEmitter,ViewChildren,QueryList } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Customer } from './customer.interface';

@Component({
 
  selector: 'build-form',
  templateUrl: 'app/example-code/formBuilder.component.html',
})
export class AppComponent implements OnInit,AfterViewInit {

    @Output() submitData = new EventEmitter()
    @Output() openDialog = new EventEmitter()
    

    @ViewChildren('allFields') fieldsList: QueryList<any>;
    public myForm: FormGroup;

    constructor(private _fb: FormBuilder) { }

    ngOnInit() {
        this.myForm = this._fb.group({
            name: ['', [Validators.required, Validators.minLength(5)]],
            addresses: this._fb.array([this.initAddress()])
        });
    }

    ngAfterViewInit(){
       this.fieldsList.changes.subscribe( fieldsList => {

            if(fieldsList.length < 1){
               this.openDialog.emit();
            }
        })   
    }

    initAddress() {
        return this._fb.group({
            street: ['', Validators.required],
            postcode: ['']
        });
    }

    addAddress() {
        const control = <FormArray>this.myForm.controls['addresses'];
        control.push(this.initAddress());
    }

    removeAddress(i: number) {
        const control = <FormArray>this.myForm.controls['addresses'];
        control.removeAt(i);
    }

    save(model: Customer) {
        // call API to save
        // ...
        this.submitData.emit();
        console.log(model);
    }
}