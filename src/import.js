import * as d3 from "d3";
import XLSX from "xlsx";

var xlsx_first_sheet_to_json = function(data) {
  /* if binary string, read with type 'binary' */
  var workbook = XLSX.read(data, {
    type: 'binary'
  });

  /* Get worksheet */
  var first_sheet_name = workbook.SheetNames[0];
  var worksheet = workbook.Sheets[first_sheet_name];
  return XLSX.utils.sheet_to_json(worksheet);
}

export default function(cb) {
  if (window.FileReader && window.addEventListener) {
    window.addEventListener('load', function() {
      function cancel() {
        d3.event.preventDefault();
        return false;
      }

      function onDrop() {
        var e = d3.event;
        // stops the browser from redirecting off to the file.
        e.stopPropagation();
        e.preventDefault();

        var files = e.dataTransfer.files;
        var i, f;
        for (i = 0, f = files[i]; i != files.length; ++i) {
          var reader = new FileReader();
          // var name = f.name;
          var name_parts = f.name.split('.');
          var extension = name_parts[name_parts.length - 1];

          if (extension == 'xlsx') {
            reader.onload = function(e) {
              var data = e.target.result;
              var json = xlsx_first_sheet_to_json(data);

              cb(json);
            };
            reader.readAsBinaryString(f);
          } else {
            // Not an XLSX spreadsheet
          }
        }
      }

      // Tells the browser that we *can* drop on this target
      d3.select(window).
        on('dragover', cancel).
        on('dragenter', cancel).
        on('drop', onDrop);
    }, false);
  } else {
    throw 'Your browser does not support modern HTML5 features.';
  }
}
