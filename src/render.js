import * as d3 from 'd3'
import { schemeCategory10 } from 'd3-scale-chromatic'

import { bestFit, paperSizes } from './download'
import svgRenderer from './svg'
import link from './link'
import { diagonal } from './diagonal'
import { appendColourLegend, appendWteLegend } from './legend'

var appendNodeCircle = function (node, colourScale, sizeScale) {
  node.append('circle')
    .attr('r', function (d) {
      // if (isNaN(d.data.wte) || d.data.wte === 0) return 0
      // var radius = 3 * Math.sqrt(d.data.wte)
      // return radius
      return sizeScale(d.data.wte)
    })
    .attr('fill', function (d) {
      // if (d.data.label === 'Dis-est.') return '#ccc'
      // return d.data.colour
      // console.log(d.pay_grade)
      return colourScale(d.data.pay_grade)
    })
}

var appendNodeLabel = function (node) {
  node.append('text')
    .attr('dy', '.31em')
    .attr('text-anchor', function (d) { return d.x < 180 ? 'start' : 'end' })
    .attr('transform', function (d) { return d.x < 180 ? 'translate(6)' : 'rotate(180)translate(-6)' })
    .style('fill', function (d) {
      return d.data.label_colour || '#333'
    })
    .attr('font-size', '6px')
    .attr('font-family', 'sans-serif')
    .text(function (d) {
      return d.data.label
    })
}

export default function (svgId, rows, payGradeColumnName, wteColumnName) {
  var width = paperSizes.a2.width
  var height = paperSizes.a2.height
  var radius = d3.min([width, height]) / 2 - 100

  var tree = d3.tree()
    .size([360, radius])
    .separation(function (a, b) { return (a.parent === b.parent ? 0.66 : 2) / a.depth })

  var svg = svgRenderer(svgId, width, height)
  var g = svg.append('g').attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')')

  var payGradeValues = Array.from(new Set(rows.map(function (d) { return d.pay_grade })))
    .sort((a,b) => a.localeCompare(b))
  var payGradeScale = d3.scaleOrdinal()
    .domain(payGradeValues)
    // .range([0, 1])
    .range(schemeCategory10)

  var wteValues = rows.map(d => d.wte)
  var wteScale = d3.scaleSqrt()
    .domain([0, d3.max(wteValues)])
    .range([0, 3])

  appendColourLegend(svg, payGradeValues, payGradeScale, payGradeColumnName)
  appendWteLegend(svg, wteScale, wteColumnName)

  var stratify = d3.stratify()
    .id(function (d) { return d.reference })
    .parentId(function (d) { return d.report_to })

  // Look for orphaned rows
  var ids = rows.map(function (d) {
    return d.reference
  })
  var unknownParents = rows.filter(function (d) {
    return !ids.includes(d.report_to) && d.report_to != ''
  }).map(function (d) {
    return d.reference
  })
  if (unknownParents.length !== 1) {
    throw new Error('Unknown parents for Reference Ids: ' + unknownParents.join(', '))
  }
  var root_row = rows.find(d => d.reference === unknownParents[0])
  root_row.report_to = ''

  var root = tree(stratify(rows))
  link(g, root, diagonal)

  var node = g.selectAll('.node')
    .data(root.descendants())
    .enter().append('g')
    .attr('class', 'node')
    .attr('transform', function (d) {
      return 'rotate(' + (d.x - 90) + ')translate(' + d.y + ')'
    })

  appendNodeCircle(node, payGradeScale, wteScale)
  appendNodeLabel(node)

  var boundingRect = g.node().getBoundingClientRect()
  var best_fit = bestFit(boundingRect, width, height)
  g.attr('transform', 'translate(' + best_fit.translateX + ',' + best_fit.translateY + ')scale(' + best_fit.scale + ')')
}
