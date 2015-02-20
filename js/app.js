window.onload = function() {

	var s = Snap("#el");


	polarToCartesian = function(cx, cy, r, angle) {
		angle = (angle - 90) * Math.PI / 180;
		return {
			x: cx + r * Math.cos(angle),
			y: cy + r * Math.sin(angle)
		};
	};


  // function create sector
  createSector = function(x, y, bR, lR, startAngle, endAngle) {

    var sector1 = {}, sector2 = {}, sector;

    sector1.start = polarToCartesian(x, y, bR, startAngle %= 360);
    sector1.end = polarToCartesian(x, y, bR, endAngle %= 360);

    sector2.start = polarToCartesian(x, y, lR, startAngle %= 360);
    sector2.end = polarToCartesian(x, y, lR, endAngle %= 360);

    // bild sector
    return "M "+sector1.start.x+" "+sector1.start.y+" A"+bR+" "+bR+" 0 "+ (endAngle - startAngle >= 180 ? 1 : 0) +" 1 "+sector1.end.x+" "+sector1.end.y+" "+
      "L"+sector2.end.x+" "+sector2.end.y+" "+
      "A"+lR+" "+lR+" 0 "+ (endAngle - startAngle >= 180 ? 1 : 0) +" 0 "+sector2.start.x+" "+sector2.start.y+"Z";
  };


  // function count sector
  function fullSector(count) {
    var n, begin = 0, end;
    n = 360 / count;
    end = n

    while(end-360 <= 0) {
      if(end > 359) {
        end = 359.9;
      }  
      s.path(createSector(200,200,100,30,begin,end))
        .attr({
          fill: 'tomato',
          stroke: '#ccf',
          strokeWidth: 2
        });
      begin = begin + n;
      end = end + n;
    }
  };


  // test
  fullSector(10);

}