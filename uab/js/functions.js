Colors = {};
Colors.names = {
  blue: "#AEC6CF",
  brown: "#836953",
  darkblue: "#779ECB",
  darkcyan: "#008b8b",
  darkgrey: "#CFCFC4",
  darkgreen: "#006400",
  darkkhaki: "#bdb76b",
  darkolivegreen: "#556b2f",
  darkorange: "#C46210",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  gold: "#ffd700",
  mantisgreen: "#74C365",
  indigo: "#4b0082",
  pastelblue: "#73A9C2",
  pastelgreen: "#77DD77",
  lightgrey: "#696969",
  pastelpurple: "#B39EB5",
  maroon: "#800000",
  navy: "#000080",
  olive: "#808000",
  pastelorange: "#FFB347",
  purple: "#800080",
  violet: "#CB99C9",
  rubyred: "#9B111E",
  yellow: "#ffff00"
};

Colors.random = function() {
  var result = 0;
  var count = 0;
  for (var prop in this.names)
      if ( (Math.random() < 1/++count) && (result === 0)) {
         result = this.names[prop];
         delete this.names[prop];
       }

  return result;
};


function processChartIpes(myPieChart,siglaIpes) {

  $.getJSON("model/polos.php?operation=polosbystate&sigla=" + siglaIpes ,function (data) {
    for (var i = 0; i < data.length; i++) {
      //data[i][0] -> state / data[i][1] -> number of polos in this state
      myPieChart.addData({
        "label": data[i][0],
        "value": data[i][1],
        "color": Colors.random()
      });
    }

    myPieChart.update();

    var legend = myPieChart.generateLegend();
    $("#legend").html(legend);

  }


  );
}


function processChartPolo(myPieChart,idPolo) {

  $.getJSON("model/cursos.php?operation=cursosbyipes&idpolo=" + idPolo ,function (data) {
    for (var i = 0; i < data.length; i++) {
      //data[i][0] -> ipes / data[i][1] -> number of cursos from this ipes
      myPieChart.addData({
        "label": data[i][0],
        "value": data[i][1],
        "color": Colors.random()
      });
    }
    myPieChart.update();

    var legend = myPieChart.generateLegend();
    $("#legend").html(legend);
  
  } );


}
