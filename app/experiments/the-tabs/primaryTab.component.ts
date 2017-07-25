import { Component, EventEmitter, Output, Input } from '@angular/core'
import { Router } from '@angular/router'
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'
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

    constructor(protected fb: FormBuilder) {
        this.name = "A Nameless Tab"; // the value is garbage will fix later doesn't cause any exceptions at this time
    }

    public set theForm(value: FormGroup) {
        this._theForm = value;
    }
    public get theForm() {
        return this._theForm;
    }

}