import * as d3 from 'd3'

require('./normalize.css')
require('./skeleton.css')
window.d3 = d3

export {
  default as version
} from './version'

export {
  default as prepareDrop
} from './import'

export {
  default as render
} from './render'

export {
  downloadPDF,
  downloadSVG,
  uriPDF
} from './download'

export {
  columnCommonalityArray,
  columnTypeArray,
  columnUniquenessArray,
  referenceColumnUniqueness,
  reportsToColumnCommonality,
  sizeColumnNumericality
} from './utils'
