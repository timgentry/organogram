import { select } from 'd3'

export default function (id, diameter) {
  return select('body').append('svg:svg')
    .attr('id', id)
    .attr('x', '0px')
    .attr('y', '0px')
  // .attr("width", diameter)
  // .attr("height", diameter - 150)
    .attr('viewBox', '0 0 ' + diameter + ' ' + (diameter - 150))
    // .attr('preserveAspectRatio', 'xMidYMid meet')
    .attr('xmlns', 'http://www.w3.org/2000/svg')
    .attr('version', '1.1')
    .append('g')
    .attr('transform', 'translate(' + (diameter - 0) / 2 + ',' + (diameter - 300) / 2 + ')')
}
