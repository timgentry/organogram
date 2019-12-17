export function project (x, y) {
  var angle = (x - 90) / 180 * Math.PI; var radius = y
  var newX = radius * Math.cos(angle)
  var newY = radius * Math.sin(angle)
  return [newX, newY]
}

export function diagonal (d) {
  return 'M' + project(d.x, d.y) +
       'C' + project(d.x, (d.y + d.parent.y) / 2) +
       ' ' + project((d.depth === 1 ? d.x : d.parent.x), (d.y + d.parent.y) / 2) +
       ' ' + project((d.depth === 1 ? d.x : d.parent.x), d.parent.y)
}
