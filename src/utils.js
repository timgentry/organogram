// returns columnName and reportsTo intersection set count and total set count
export function columnCommonalityArray (referenceFieldName, data) {
  const referenceSet = new Set(data.map(function (d) { return d[referenceFieldName] }))
  var columns = Object.keys(data[0])

  // Remove reference column
  for (var i = 0; i < columns.length; i++) {
    if (columns[i] === referenceFieldName) {
      columns.splice(i, 1)
    }
  }

  return columns.map(function (column) {
    const columnSet = new Set(data.map(function (d) { return d[column] }))

    return [column, new Set([...columnSet].filter(x => referenceSet.has(x))).size, columnSet.size]
  })
}

export function columnUniquenessArray (json) {
  var columns = Object.keys(json[0])
  var totalRows = json.length

  return columns.map(function (column) {
    const columnSet = new Set(json.map(function (d) { return d[column] }))

    return [column, columnSet.size, totalRows]
  })
}

// returns columnName and unique count and total rows for columns over 90% unique in reverse order
export function referenceColumnUniqueness (array) {
  var orderedArray = array.filter(a => (a[1] / a[2]) > 0.9).sort((a, b) => b[1] - a[1])

  return orderedArray
}

// returns columnName and comonality for columns with something in common in reverse order
export function reportsToColumnCommonality (array) {
  var orderedArray = array
    // .filter(a => a[1] > 0)
    .sort((a, b) => (b[1] / b[2]) - (a[1] / a[2]))

  return orderedArray
}
