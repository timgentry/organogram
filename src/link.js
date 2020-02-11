export default function (g, root, diagonal) {
  var links = root.descendants().slice(1)

  return g.selectAll('.link')
    .data(links)
    .enter().append('path')
    .attr('class', 'link')
    .attr('fill', 'none')
    .attr('stroke', function (d) {
      // if (d.parent.data.grade_index > d.data.grade_index) {
      //   return 'red'
      // } else {
        return '#ccc'
      // }
    })
    .attr('stroke-width', '1px')
    // .attr('stroke-dasharray', function (d) {
    //   if (d.parent.data.pay_grade === d.data.pay_grade) return '5,5'
    //   return null
    // })
    .attr('d', diagonal)
}
