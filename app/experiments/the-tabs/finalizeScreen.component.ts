import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  template:
  `
    <div> 
      <p> I am the end Screen </p>
    </div>

  `
})
export class FinalizeScreenComponent {

  constructor(private router:Router) {
  }

  cancel() {
    this.router.navigate(['events'])
  }
}