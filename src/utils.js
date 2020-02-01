import * as _ from 'lodash'

export function columnUniquenessArray (json) {
  var columns = Object.keys(json[0])
  var totalRows = json.length

  return columns.map(function (column) {
    return [column, _.uniqBy(json, column).length, totalRows]
  })
}

// returns columnName and unique count and total rows for columns over 90% unique in reverse order
export function referenceColumnUniqueness (array) {
  var orderedArray = array.filter(a => (a[1] / a[2]) > 0.9).sort((a, b) => b[1] - a[1])

  return orderedArray
}
