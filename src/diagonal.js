// var Vertex2D = function(x, y) {
//     this.x = parseFloat(x)
//     this.y = parseFloat(y)
// };

var perspectiveProjection = function perspectiveProjection(x, y, z) {
  // Distance between the camera and the plane
  var d = 200
  var r = d / y

  // return new Vertex2D(r * x, r * z)
  return [r * x, r * z]
}

export function project (x, y) {
  var angle = (x - 90) / 180 * Math.PI; var radius = y
  var newX = radius * Math.cos(angle)
  var newY = radius * Math.sin(angle)
  return [newX, newY]

  // return perspectiveProjection(x, y, y / 2)
  // return [0, 0]
}

export function diagonal (d) {
  return 'M' + project(d.x, d.y) +
       'C' + project(d.x, (d.y + d.parent.y) / 2) +
       ' ' + project((d.depth === 1 ? d.x : d.parent.x), (d.y + d.parent.y) / 2) +
       ' ' + project((d.depth === 1 ? d.x : d.parent.x), d.parent.y)
}
