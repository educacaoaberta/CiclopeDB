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

siglas_estados = {
  	"Acre": "AC",
  	"Alagoas": "AL",
  	"Amazonas": "AM",
  	"Amapá": "AP",
  	"Bahia": "BA",
  	"Ceará": "CE",
  	"Distrito Federal": "DF",
  	"Espírito Santo": "ES",
    "Goiás": "GO",
    "Maranhão": "MA",
    "Minas Gerais": "MG",
    "Mato Grosso do Sul": "MS",
    "Mato Grosso": "MT",
    "Pará": "PA",
    "Paraíba": "PB",
  	"Pernambuco": "PE",
  	"Piauí": "PI",
  	"Paraná": "PR",
  	"Rio de Janeiro": "RJ",
  	"Rio Grande do Norte": "RN",
  	"Rondônia": "RO",
  	"Roraima": "RR",
  	"Rio Grande do Sul": "RS",
  	"Santa Catarina": "SC",
  	"Sergipe": "SE",
  	"São Paulo": "SP",
  	"Tocantins": "TO"
  }
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
        "label": siglas_estados[estado],
        "value": qtde,
        "color": Colors.random()
      });
    });
    myPieChart.update();
  });
}
