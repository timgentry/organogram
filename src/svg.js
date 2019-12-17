import { select } from 'd3'

export default function (id, width, height) {
  return select('body').append('svg:svg')
    .attr('id', id)
    .attr('x', '0px')
    .attr('y', '0px')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', '0 0 ' + width + ' ' + height)
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .attr('xmlns', 'http://www.w3.org/2000/svg')
    .attr('version', '1.1')
}
