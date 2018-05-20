export {
  loadChart, processBarChartIpesWithSiglaIpes, processBarChartIpes, processBarChartIpesRegion,
  processBarChartPolos, processBarChartPolosRegion, processBarChartIpesByState
}

var regionsColors = {
  "Norte": "#77AAAD",
  "Nordeste": "#6E7783",
  "Centro-Oeste": "#84B1ED",
  "Sudeste": "#9DC3C1",
  "Sul": "#4FB0C6"
}

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
var polosByStateWithFederativeUnitJson = "./static/json/ipesSigla_polosData.json";
var ipesByStateWithPoloId = "./static/json/poloId_ipesData.json";
var ipesByStateJson = "./static/json/ipesbystate.json";
var polosByStateJson = "./static/json/polosbystate.json";

// carrega o gráfico com as informações passadas nos parametros
function loadChart(id, type, label) {
  var ctx = document.getElementById(id).getContext("2d");

  return new Chart(ctx, {
    type: type,
    data: {
      labels: [],
      datasets: [{
        label: label,
        backgroundColor: [],
        data: []
      }]
    },
    options: {
      legend: {
        display: false
      },
      animation: false,
      tooltips: {
        displayColors: false
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            min: 0,
          }
        }],
        xAxes: [{
          barPercentage: 0.5
        }]
      }
    }
  });
}

// Número de polos por estado dentro dos arquivos do content
function processBarChartIpesWithSiglaIpes(myBarChart, siglaIpes) {
  $.getJSON(polosByStateWithFederativeUnitJson, function (ipes) {
    for (let i = 0; i < ipes.length; i++) {
      for (let key in ipes[i]) {
        if (key === siglaIpes) {
          if (Object.keys(ipes[i][key]).length !== 0) {
            $("#ipes-tab-dados").removeClass("hide-visually");
            for (let itempolo in ipes[i][key]) {
              myBarChart.data.labels.push(ipes[i][key][itempolo].estado);
              myBarChart.data.datasets.forEach((dataset) => {
                dataset.data.push(ipes[i][key][itempolo].quantidade_polos);
                dataset.backgroundColor.push(regionsColors[regioes[ipes[i][key][itempolo].estado]]);
              });
            }
          } else {
            $("#ipes-tab-dados").addClass("hide-visually");
          }
        }
      }
    }
    myBarChart.update();
  });
}

// Número de IPES por estado
function processBarChartIpesByState(myBarChart, idPolo) {
  $.getJSON(ipesByStateWithPoloId, function (polos) {
    $('#ipesGraphContainer').show()
    for (let i = 0; i < polos.length; i++) {
      for (let key in polos[i]) {
        if (key === idPolo) {
          if (Object.keys(polos[i][key]).length !== 0) {
            $("#polos-tab-dados").removeClass("hide-visually");
            for (let itemipes in polos[i][key]) {
              myBarChart.data.labels.push(polos[i][key][itemipes].estado);
              myBarChart.data.datasets.forEach((dataset) => {
                dataset.data.push(polos[i][key][itemipes].quantidade_ipes);
                dataset.backgroundColor.push(regionsColors[regioes[polos[i][key][itemipes].estado]]);
              });
            }
          } else {
            $('#polos-tab-dados').addClass("hide-visually");
          }
        }
      }
    }
    myBarChart.update();
  });
}

// Dados gerais da UAB: número de IPES por estado
function processBarChartIpes(barChart) {
  $.getJSON(ipesByStateJson, function (ipes) {
    let soma = 0
    for (let i = 0; i < ipes.data.length; i++) {
      let estado = ipes.data[i].estado;
      let quant = Number(ipes.data[i].quant);
      barChart.data.labels.push(estado);
      barChart.data.datasets.forEach((dataset) => {
        dataset.data.push(quant)
        dataset.backgroundColor.push(regionsColors[regioes[estado]]);
      });
      soma += quant
    }

    let total = 'Total de IPES em ' + currentYear + ': ' + soma
    $("#legendByState").html(total);

    barChart.update();

  });
}

// Dados gerais da UAB: Número de IPES por região
function processBarChartIpesRegion(myBarChart) {

  $.getJSON(ipesByStateJson, function (ipes) {
    for (let i = 0; i < ipes.data.length; i++) {
      let estado = ipes.data[i]["estado"];
      let quant = Number(ipes.data[i]["quant"]);
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
        dataset.backgroundColor.push(regionsColors[regiao]);
        dataset.data.push(qtde)
      });
    });

    myBarChart.update();

  });
}

// Dados gerais da UAB: número de polos por estado
function processBarChartPolos(barChart) {
  $.getJSON(polosByStateJson, function (polos) {
    var soma = 0
    for (var i = 0; i < polos.data.length; i++) {
      let estado = polos.data[i]["estado"];
      let quant = Number(polos.data[i]["quant"]);
      barChart.data.labels.push(estado);
      barChart.data.datasets.forEach((dataset) => {
        dataset.data.push(quant)
        dataset.backgroundColor.push(regionsColors[regioes[estado]]);
      });
      soma += quant
    }

    var total = 'Total de polos em ' + currentYear + ': ' + soma
    $("#legendPolosByState").html(total);

    barChart.update();
  });
}

// Dados gerais da UAB: Número de polos por região
function processBarChartPolosRegion(myBarChart) {

  $.getJSON(polosByStateJson, function (polos) {
    for (var i = 0; i < polos.data.length; i++) {
      let estado = polos.data[i]["estado"];
      let quant = Number(polos.data[i]["quant"]);
      if (!(regioes[estado] in polosRegiao)) {
        polosRegiao[regioes[estado]] = quant;
      }
      else {
        polosRegiao[regioes[estado]] = polosRegiao[regioes[estado]] + quant;
      }
    }

    $.each(polosRegiao, function (regiao, qtde) {
      myBarChart.data.labels.push(regiao);
      myBarChart.data.datasets.forEach((dataset) => {
        dataset.backgroundColor.push(regionsColors[regiao]);
        dataset.data.push(qtde)
      });
    });

    myBarChart.update();

  });
}
