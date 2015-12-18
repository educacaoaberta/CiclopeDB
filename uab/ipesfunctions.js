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
  var result;
  var count = 0;
  for (var prop in this.names)
      if (Math.random() < 1/++count)
         result = prop;

  delete this.names[result];
  return result;
};


function processChart(myPieChart,state) {
  var polosEstado = {};

  $.getJSON("json/polos.json", function (data) {
    $.each(data.features, function (key, val) {
      if (val.properties.ipes === state) {
        //se não existe esse estado na lista cria
        if (!(val.properties.estado in polosEstado)) {
          polosEstado[val.properties.estado] = 1;
        }
        else {
          //se existe, soma ao valor
          polosEstado[val.properties.estado] ++ ;
        }
      }
    });

    $.each(polosEstado, function (estado, qtde) {
      myPieChart.addData({
        "label": estado,
        "value": qtde,
        "color": Colors.random()
      });
    });
    myPieChart.update();
  });
}
