export function project(x, y) {
  var angle = (x - 90) / 180 * Math.PI, radius = y;
  var new_x = radius * Math.cos(angle);
  var new_y = radius * Math.sin(angle);
  return [new_x, new_y];
}

export function diagonal(d) {
  return "M" + project(d.x, d.y)
       + "C" + project(d.x, (d.y + d.parent.y) / 2)
       + " " + project((d.depth == 1 ? d.x : d.parent.x), (d.y + d.parent.y) / 2)
       + " " + project((d.depth == 1 ? d.x : d.parent.x), d.parent.y);
}
