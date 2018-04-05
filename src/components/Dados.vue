<template>
    <div>
        <table id="allunits" class="display" cellspacing="0" width="100%">
            <thead>
            <tr>
                <th>Tipo</th>
                <th>Nome</th>
                <th>Cidade</th>
                <th>UF</th>
            </tr>
            </thead>
        </table>

        <hr class='txt-hr'>

        <div class="graph">

            <div class="py12">
                <div class="txt-l txt-bold">Dados gerais da UAB: número de IPES por estado</div>
                <!--Total de IPES no ano corrente-->
                <p id="legendByState" style="margin-top: -5px;margin-bottom: 10px;"></p>
                <!-- Gráfico de Barras-->
                <canvas id="chartByState"></canvas>
            </div>

            <div class="py12">
                <div class="txt-l txt-bold" style="margin-bottom: 10px;">Dados gerais da UAB: Número de IPES por região</div>
                <canvas id="chartByRegion"></canvas>
            </div>

            <div class="py12">
                <div class="txt-l txt-bold">Dados gerais da UAB: número de polos por estado</div>
                <p id="legendPolosByState" style="margin-top: -5px;margin-bottom: 10px;"></p>
                <!-- Gráfico de Barras-->
                <canvas id="chartPolosByState" width="600" height="300"></canvas>
            </div>

            <div class="py12">
                <div class="txt-l txt-bold" style="margin-bottom: 10px;">Dados gerais da UAB: Número de polos por região</div>
                <canvas id="chartPolosByRegion"></canvas>
            </div>
        </div>
    </div>
</template>

<script>
  import {
    loadChart, processBarChartIpes, processBarChartIpesRegion, processBarChartPolos,
    processBarChartPolosRegion
  } from '../functions';

  export default {
    mounted () {
      // carrega o gráfico dos números de IPES por estado
      var myIpesStateBarChart = loadChart("chartByState", "bar", "IPES")
      processBarChartIpes(myIpesStateBarChart);

      // carrega o gráfico dos números de IPES por região
      var myIpesRegionBarChart = loadChart("chartByRegion", "bar", "IPES")
      processBarChartIpesRegion(myIpesRegionBarChart);

      // carrega o gráfico dos número de polos por estado
      var myPoloStateBarChart = loadChart("chartPolosByState", "bar", "Polos")
      processBarChartPolos(myPoloStateBarChart);

      // carrega o gráfico dos número de polos por região
      var myPoloRegionBarChart = loadChart("chartPolosByRegion", "bar", "Polos")
      processBarChartPolosRegion(myPoloRegionBarChart);

      $('#allunits').DataTable({
        "ajax": {
          "url": "./static/json/lista-unidades.geojson",
          "dataSrc": "features"
        },
        "language": {
          "url": "./static/json/datatables_pt-br.json"
        },
          "columns": [
          { "data": "properties.tipo" },
          { "data": "properties.nome" },
          { "data": "properties.cidade" },
          { "data": "properties.estado" }
        ],
        "columnDefs": [
          { "width": "20%", "targets": 0 },
          { "width": "40%", "targets": 1 },
          { "width": "10%", "targets": 3 }
        ]
      });
    }
  }

</script>
