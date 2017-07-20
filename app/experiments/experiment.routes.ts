import {ExperimentContainer} from './experiment-container.component'
import {ExperimentsResolver } from './experiments-resolver.service'


export const ExperimentRoutes = [
  {path: 'primaryscreen', component: ExperimentContainer,resolve:{tabs:ExperimentsResolver}}

]