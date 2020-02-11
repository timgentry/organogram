export function appendColourLegend (svg, values, scale, text) {
  var g = svg.append('g').attr('transform', 'translate(40, 60)')

  g.append('text')
    .attr('dy', '.31em')
    .attr('text-anchor', 'start')
    .attr('transform', 'translate(-3)')
    .style('fill', 'black')
    .attr('font-size', '8px')
    .attr('font-weight', 'bold')
    .attr('font-family', 'sans-serif')
    .text(text)

  var node = g.selectAll('.label')
    .data(values)
    .enter()
    .append('g')
    .attr('class', 'label')
    .attr('transform', function (d, i) {
      return 'translate(0,' + ((i + 1) * 10) + ')'
    })

  node.append('circle')
    .attr('r', 3)
    .attr('fill', scale)

  node.append('text')
    .attr('dy', '.31em')
    .attr('text-anchor', 'start')
    .attr('transform', 'translate(6)')
    .style('fill', function (d) {
      return typeof d !== 'undefined' ? 'black' : '#999'
    })
    .attr('font-size', '8px')
    .attr('font-family', 'sans-serif')
    .text(function (d) {
      return typeof d !== 'undefined' ? d : 'Blank'
    })
}

export function appendWteLegend (svg, scale, text) {
  var ticks = scale.ticks(6)
  // Remove the 0 tick, we don't need it
  ticks.shift()

  var g = svg.append('g').attr('transform', 'translate(' + (+svg.attr('width') - 40) + ', 60)')

  g.append('text')
    .attr('dy', '.31em')
    .attr('text-anchor', 'end')
    .attr('transform', 'translate(3)')
    .style('fill', 'black')
    .attr('font-size', '8px')
    .attr('font-weight', 'bold')
    .attr('font-family', 'sans-serif')
    .text(text)

  var node = g.selectAll('.label')
    .data(ticks)
    .enter()
    .append('g')
    .attr('class', 'label')
    .attr('transform', function (d, i) {
      return 'translate(0,' + ((i + 1) * 10) + ')'
    })

  node.append('circle')
    .attr('r', scale)
    .attr('fill', '#999')

  node.append('text')
    .attr('dy', '.31em')
    .attr('text-anchor', 'end')
    .attr('transform', 'translate(-6)')
    .style('fill', 'black')
    .attr('font-size', '8px')
    .attr('font-family', 'sans-serif')
    .text(function (d, i) {
      return d
    })
}
