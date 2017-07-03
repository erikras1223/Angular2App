import { Injectable } from '@angular/core'
import { Resolve } from '@angular/router'
import { ExperimentsService } from './experiments.service'

/* This service will be used in routes.ts */

@Injectable()
export class ExperimentsResolver implements Resolve<any> {
  constructor(private experService:ExperimentsService) {}
  
  resolve() { // resolve is good with asyncrous data, it waits to load before display component
    return this.experService.getTabs() // this is an obserable, but resolve doesn't require calling subscribe because resolve does it.
  }
}