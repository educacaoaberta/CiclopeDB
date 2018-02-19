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

Colors.random = function () {
  var result = 0;
  var count = 0;
  for (var prop in this.names)
    if ((Math.random() < 1 / ++count) && (result === 0)) {
      result = this.names[prop];
      delete this.names[prop];
    }

  return result;
};

// Estados e Regiões
var regioes = {
  "AC": "Norte",
  "AL": "Nordeste",
  "AP": "Norte",
  "AM": "Norte",
  "BA": "Nordeste",
  "CE": "Nordeste",
  "DF": "Centro-Oeste",
  "ES": "Sudeste",
  "GO": "Centro-Oeste",
  "MA": "Nordeste",
  "MS": "Centro-Oeste",
  "MT": "Centro-Oeste",
  "MG": "Sudeste",
  "PA": "Norte",
  "PB": "Nordeste",
  "PR": "Sul",
  "PE": "Nordeste",
  "PI": "Nordeste",
  "RJ": "Sudeste",
  "RN": "Nordeste",
  "RS": "Sul",
  "RO": "Norte",
  "RR": "Norte",
  "SC": "Sul",
  "SP": "Sudeste",
  "SE": "Nordeste",
  "TO": "Norte"
};

var ipesRegiao = {};
var polosRegiao = {};

var currentYear = (new Date()).getFullYear();
var polosByStateWithFederativeUnitJson = "model/polos.php?operation=polosbystatewithfederativeunit&sigla=";
var ipesByStateJson = "model/ipes.php?operation=ipesbystate";
var polosByStateJson= "model/polos.php?operation=polosbystate";

// Número de polos por estado dentro dos arquivos do content
function processChartIpes(myPieChart, siglaIpes) {

  $.getJSON(polosByStateWithFederativeUnitJson + siglaIpes, function (data) {
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

// Dados gerais da UAB: número de IPES por estado
function processBarChartIpes(barChart) {
  $.getJSON(ipesByStateJson, function (data) {
    var soma = 0
    for (var i = 0; i < data.length; i++) {
      barChart.data.labels.push(data[i]["estado"]);
      barChart.data.datasets.forEach((dataset) => {
        dataset.data.push(data[i]["quant"])
        // dataset.backgroundColor.push(getRandomColor());
      });
      soma += Number(data[i]["quant"])
    }

    var total = 'Total de IPES em ' + currentYear + ': ' + soma
    $("#legendByState").html(total);

    barChart.update();

  });
}

// Dados gerais da UAB: Número de IPES por região
function processBarChartIpesRegion(myBarChart) {

  $.getJSON(ipesByStateJson, function (data) {
    for (var i = 0; i < data.length; i++) {
      estado = data[i]["estado"];
      quant = Number(data[i]["quant"]);
      if (!(regioes[estado] in ipesRegiao)) {
        ipesRegiao[regioes[estado]] = quant;
      }
      else {
        ipesRegiao[regioes[estado]] = ipesRegiao[regioes[estado]] + quant;
      }
    }


    $.each(ipesRegiao, function (regiao, qtde) {
      myBarChart.data.labels.push(regiao);
      myBarChart.data.datasets.forEach((dataset) => {
        // dataset.backgroundColor.push(getRandomColor());
        dataset.data.push(qtde)
      });
    });

    myBarChart.update();

  });
}

// Dados gerais da UAB: número de polos por estado
function processBarChartPolos(barChart) {
  $.getJSON(polosByStateJson, function (data) {
    var soma = 0
    for (var i = 0; i < data.length; i++) {
      barChart.data.labels.push(data[i]["uf"]);
      barChart.data.datasets.forEach((dataset) => {
        dataset.data.push(data[i]["quant"])
        // dataset.backgroundColor.push(getRandomColor());
      });
      soma += Number(data[i]["quant"])
    }

    var total = 'Total de polos em ' + currentYear + ': ' + soma
    $("#legendPolosByState").html(total);

    barChart.update();
  });
}

// Dados gerais da UAB: Número de polos por região
function processBarChartPolosRegion(myBarChart) {

  $.getJSON(polosByStateJson, function (data) {
    for (var i = 0; i < data.length; i++) {
      uf = data[i]["uf"];
      quant = Number(data[i]["quant"]);
      if (!(regioes[uf] in polosRegiao)) {
        polosRegiao[regioes[uf]] = quant;
      }
      else {
        polosRegiao[regioes[uf]] = polosRegiao[regioes[uf]] + quant;
      }
    }

    $.each(polosRegiao, function (regiao, qtde) {
      myBarChart.data.labels.push(regiao);
      myBarChart.data.datasets.forEach((dataset) => {
        // dataset.backgroundColor.push(getRandomColor());
        dataset.data.push(qtde)
      });
    });

    myBarChart.update();

  });
}