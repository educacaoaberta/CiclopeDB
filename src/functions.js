export {
  loadChart, processBarChartIpesWithSiglaIpes, processBarChartIpes, processBarChartIpesRegion,
  processBarChartPolos, processBarChartPolosRegion
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
var polosByStateWithFederativeUnitJson = "./static/json/ipesdata.json";
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
      $('#graphContainer').show()
      for (let i = 0; i < ipes.data.length; i++) {
        if(ipes.data[i].ipes_sigla === siglaIpes) {
          let estado = ipes.data[i]['uf'];
          let quant = Number(ipes.data[i]['quant']);
          myBarChart.data.labels.push(estado);
          myBarChart.data.datasets.forEach((dataset) => {
            dataset.data.push(quant);
            dataset.backgroundColor.push(regionsColors[regioes[estado]]);
          });
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
      let uf = polos.data[i]["uf"];
      let quant = Number(polos.data[i]["quant"]);
      barChart.data.labels.push(uf);
      barChart.data.datasets.forEach((dataset) => {
        dataset.data.push(quant)
        dataset.backgroundColor.push(regionsColors[regioes[uf]]);
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
      let uf = polos.data[i]["uf"];
      let quant = Number(polos.data[i]["quant"]);
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
        dataset.backgroundColor.push(regionsColors[regiao]);
        dataset.data.push(qtde)
      });
    });

    myBarChart.update();

  });
}
