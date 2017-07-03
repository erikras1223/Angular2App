import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { CommonModule } from '@angular/common'

@Component({

    selector: 'prep-tab',
    template: `
              <div> something </div>
    `
})
export class PrimaryTab {
    name:string

    constructor(){
        this.name = "A Nameless Tab"; // the value is garbage will fix later doesn't cause any exceptions at this time
    }

    
}