import {PrimaryTabContainer} from './primaryTabContainer.component'
import {ExperimentsResolver } from './experiments-resolver.service'


export const ExperimentRoutes = [
  {path: 'primaryscreen', component: PrimaryTabContainer,resolve:{tabs:ExperimentsResolver}}

]