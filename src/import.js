/* global FileReader */
import * as d3 from 'd3'
import XLSX from 'xlsx'

var xlsxFirstSheetToJSON = function (data) {
  /* if binary string, read with type 'binary' */
  var workbook = XLSX.read(data, {
    type: 'binary'
  })

  /* Get worksheet */
  var firstSheetName = workbook.SheetNames[0]
  var worksheet = workbook.Sheets[firstSheetName]
  return XLSX.utils.sheet_to_json(worksheet)
}

var processFile = function (file, callback) {
  var reader = new FileReader()
  // var name = file.name;
  var nameParts = file.name.split('.')
  var extension = nameParts[nameParts.length - 1]

  if (extension === 'xlsx') {
    reader.onload = function (e) {
      var data = e.target.result
      var json = xlsxFirstSheetToJSON(data)

      callback(json)
    }
    reader.readAsBinaryString(file)
  } else {
    // Not an XLSX spreadsheet
  }
}

export default function (callback) {
  if (window.FileReader && window.addEventListener) {
    window.addEventListener('load', function () {
      function cancel () {
        d3.event.preventDefault()
        return false
      }

      function onDrop () {
        var e = d3.event
        // stops the browser from redirecting off to the file.
        e.stopPropagation()
        e.preventDefault()

        var files = e.dataTransfer.files
        var i, file
        for (i = 0, file = files[i]; i !== files.length; ++i) {
          processFile(file, callback)
        }
      }

      // Tells the browser that we *can* drop on this target
      d3.select(window)
        .on('dragover', cancel)
        .on('dragenter', cancel)
        .on('drop', onDrop)
    }, false)
  } else {
    throw new Error('Your browser does not support modern HTML5 features.')
  }
}
