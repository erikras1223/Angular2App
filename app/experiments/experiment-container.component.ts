import { Component,
        OnInit,
        Input,
        ChangeDetectorRef,
        ViewContainerRef,
        ComponentFactoryResolver,
        ComponentRef,
        ComponentFactory,
        OnDestroy,
        Type,VERSION } from '@angular/core'
import { ActivatedRoute } from '@angular/router'



@Component({
  templateUrl: 'app/experiments/experiment-container.component.html',
})
export class ExperimentContainer  implements OnInit {

  componentNames:Array<string>
  verName:any
  

  constructor(
              private route:ActivatedRoute ){
                 this.verName = `Angular! v${VERSION.full}`
              }
  
  ngOnInit(){
    this.componentNames = this.route.snapshot.data['tabs']; // getting a array called tabs off the route
    
  }

   addTab(tab:string){
    this.componentNames.push(tab);
   }

 

}