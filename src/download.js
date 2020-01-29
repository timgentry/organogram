/* eslint-env browser */
import svg2pdf from 'svg2pdf.js'
import jsPDF from 'jspdf-yworks'
import * as d3 from 'd3'

// https://www.gnu.org/software/gv/manual/html_node/Paper-Keywords-and-paper-size-in-points.html
export var paperSizes = {
  letter: { width: 612, height: 792 },
  a0: { width: 2384, height: 3371 },
  a1: { width: 1685, height: 2384 },
  a2: { width: 1190, height: 1684 },
  a3: { width: 842, height: 1190 },
  a4: { width: 595, height: 842 },
  a5: { width: 420, height: 595 }
}

export function maximumScale (width1, height1, width2, height2) {
  var widthScale = width2 / width1
  var heightScale = height2 / height1

  return d3.min([widthScale, heightScale])
}

export function bestFit (boundingBox, width, height) {
  var bestScale = maximumScale(boundingBox.width, boundingBox.height, width, height)
  return {
    scale: bestScale * 0.98,
    translateX: (width / 2) + (((width - boundingBox.right) - boundingBox.left) / 2),
    translateY: height / 2
  }
}

export function uriPDF (document, id, paper) {
  var svgElement = document.getElementById(id)
  var maxScale

  // create a new jsPDF instance
  var pdf = new jsPDF('l', 'pt', [paper.width, paper.height])
  if (paper.width / paper.height <= 1) {
    // Portrait or square
    maxScale = maximumScale(svgElement.width.baseVal.value, svgElement.height.baseVal.value, paper.width, paper.height)
  } else {
    // TODO: Landscape
  }

  // render the svg element
  svg2pdf(svgElement, pdf, {
    xOffset: 0,
    yOffset: 0,
    scale: maxScale
  })

  // return the data URI
  return pdf.output('datauristring')
}

export function uriSVG (document, id) {
  var svgElement = document.getElementById(id)
  var svgContent = new XMLSerializer().serializeToString(svgElement)
  var svgBlob = new Blob(
    [
      '<?xml version="1.0" encoding="iso-8859-1"?>',
      '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">',
      svgContent
    ],
    { type: 'image/svg+xml' }
  )

  return URL.createObjectURL(svgBlob)
}

export function downloadPDF (document, svgId, linkId, paperId) {
  var $downloadLink = document.getElementById(linkId)
  var $paperSizeSelect = document.getElementById(paperId)

  var setPdfHrefFromSelection = function (element) {
    var paperSize = element.options[element.selectedIndex].value

    $downloadLink.href = uriPDF(document, svgId, paperSizes[paperSize])
    $downloadLink.download = `organogram_${paperSize}.pdf`
  }

  var paperSizeChanged = function(event) {
    event.preventDefault()

    setPdfHrefFromSelection(event.currentTarget)
  }

  $paperSizeSelect.addEventListener('change', paperSizeChanged, false)
  setPdfHrefFromSelection($paperSizeSelect)

  $downloadLink.style.display = 'inline-block'
  $paperSizeSelect.style.display = 'inline-block'
}

export function downloadSVG (document, svgId, linkId) {
  var a = document.getElementById(linkId)
  a.href = uriSVG(document, svgId)
  a.download = 'organogram.svg'
  a.style.display = 'inline-block'
}
