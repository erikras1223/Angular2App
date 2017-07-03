import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { PrimaryTab } from  './primaryTab.component'

@Component({
  template:
  `
    <div> 
      <p> I am the end Screen </p>
    </div>

  `
})
export class FinalizeTab extends PrimaryTab {
  name:string = "Summary"

  constructor(private router:Router) {
    super()

  }
  

  cancel() {
    this.router.navigate(['events'])
  }
}