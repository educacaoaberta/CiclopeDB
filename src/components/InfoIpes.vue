<template>
<right-sidebar id="info-ipes-right-sidebar">
  <template slot="tabs">
      <div class='px12 py12 bg-blue-faint txt-s'>
          <div class="txt-l txt-bold mb-neg3">{{ nome }}</div>
      </div>
    <ul class="tabs bg-blue border-b border--white flex-parent h40 txt-bold txt-s"
            style="justify-content:space-around;">
            <li class="mb-neg1 px12 py6 border-b border--white border--white-on-active color-lighten50 color-white-on-active color-lighten75-on-hover">
                <a href="#info-ipes-tab-info-gerais">Informações Gerais</a>
            </li>
            <li class="mb-neg1 px12 py6 border-b border--white border--white-on-active color-lighten50 color-white-on-active color-lighten75-on-hover">
                <a href="#info-ipes-tab-dados">Dados</a>
            </li>
            <li v-show="sigla"
                class="mb-neg1 px12 py6 border-b border--white border--white-on-active color-lighten50 color-white-on-active color-lighten75-on-hover">
                <a href="#info-ipes-tab-linha-tempo">Linha do Tempo</a>
            </li>
        </ul>
  </template>
  <template slot="content">
    <div class='px12 py12 scroll-auto set-height'>
      <div id="info-ipes-tab-info-gerais" v-show="sigla">
        <div class='grid'>
            <!--Logradouro-->
            <div class='col col--1 block' style="margin: auto;" v-if="endereco.logradouro.length > 2">
                <svg class="icon h24 w24 mx-auto mx-auto">
                    <use xlink:href="#icon-street"></use>
                </svg>
            </div>
            <div class='col col--11 my6' v-if="endereco.logradouro.length > 2">
                <div class="txt-s txt-bold mb-neg3">
                    <p>Endereço</p>
                </div>
                <div class="txt-m">
                    <p>{{ endereco.logradouro }}</p>
                </div>
            </div>
            <!--Fim do Logradouro-->
            <!--Bairro-->
            <div class='col col--1 block' style="margin: auto;" v-if="bairro != ''">
                <svg class="icon h24 w24 mx-auto">
                    <use xlink:href="#icon-home"></use>
                </svg>
            </div>
            <div class='col col--11 my6' v-if="bairro != ''">
                <div class="txt-s txt-bold mb-neg3">
                    <p>Bairro</p>
                </div>
                <div class="txt-m">
                    <p>{{ bairro }}</p>
                </div>
            </div>
            <!--Fim do Bairro-->
            <!--Cidade-->
            <div class='col col--1 block' style="margin: auto;">
                <svg class="icon h24 w24 mx-auto">
                    <use xlink:href="#icon-map"></use>
                </svg>
            </div>
            <div class='col col--11 my6'>
                <div class="txt-s txt-bold mb-neg3"><p>Cidade</p></div>
                <div class="txt-m">
                    <p>{{ cidade }}</p>
                </div>
            </div>
            <!--Fim do Cidade-->
            <!--Estado-->
            <div class='col col--1 block' style="margin: auto;">
                <svg class="icon h24 w24 mx-auto">
                    <use xlink:href="#icon-globe"></use>
                </svg>
            </div>
            <div class='col col--11 my6'>
                <div class="txt-s txt-bold mb-neg3"><p>Estado</p></div>
                <div class="txt-m">
                    <p>{{ estado }}</p>
                </div>
            </div>
            <!--Fim do Estado-->
            <!--CEP-->
            <div class='col col--1 block' style="margin: auto;" v-if="cep.length > 2">
                <svg class="icon h24 w24 mx-auto">
                    <use xlink:href="#icon-marker"></use>
                </svg>
            </div>
            <div class='col col--11 my6' v-if="cep.length > 2">
                <div class="txt-s txt-bold mb-neg3"><p>CEP</p></div>
                <div class="txt-m">
                    <p>{{ cep | formataCep }}</p>
                </div>
            </div>
            <!--Fim do CEP-->
            <!--Telefone-->
            <div class='col col--1 block' style="margin: auto;" v-if="telefone.length > 3">
                <svg class="icon h24 w24 mx-auto">
                    <use xlink:href="#icon-mobile"></use>
                </svg>
            </div>
            <div class='col col--11 my6' v-if="telefone.length > 3">
                <div class="txt-s txt-bold mb-neg3"><p>Telefone</p></div>
                <div class="txt-m">
                    <p>{{ telefone | formataTelefone }}</p>
                </div>
            </div>
            <!--Fim do Telefone-->
            <!--URL-->
            <div class='col col--1 block' style="margin: auto;" v-if="url != ''">
                <svg class="icon h24 w24 mx-auto">
                    <use xlink:href="#icon-info"></use>
                </svg>
            </div>
            <div class='col col--11 my6' v-if="url != ''">
                <div class="txt-s txt-bold mb-neg3"><p>URL</p></div>
                <div class="txt-m">
                    <p>{{ url }}</p>
                </div>
            </div>
            <!--Fim da URL-->
        </div>
    </div>
        <div id="info-ipes-tab-dados">
            <table id="ipes-info-table" class="display" cellspacing="0" width="100%">
                <thead>
                <tr>
                    <th>Polo</th>
                    <th>Estado</th>
                </tr>
                </thead>
            </table>

            <hr class='txt-hr'>

            <!--carrega os gráficos-->
            <div id="graphContainer">
                <div class="txt-m txt-bold mb6">
                    <p>Número de polos por estado</p>
                </div>
            </div>
        </div>
      <div id="info-ipes-tab-linha-tempo">
          <div id='timeline-embed' style="width: 100%; height: 600px"></div>
      </div>
    </div>

  </template>
</right-sidebar>
</template>

<script>
import { EventBus } from "../eventBus";
import { loadChart, processBarChartIpesWithSiglaIpes, processBarChartIpes, processBarChartIpesRegion,
  processBarChartPolos, processBarChartPolosRegion } from '../functions';

export default {
  data() {
    return {
      id: "",
      sigla: "",
      arquivo: "",
      nome_polo: "",
      nome: "",
      endereco: {
        logradouro: "",
        numero: "",
        complemento: ""
      },
      bairro: "",
      cidade: "",
      estado: "",
      cep: "",
      nome_fantasia: "",
      telefone: "",
      url: "",
      isVisible: false
    };
  },
  mounted() {
    $("#info-ipes-right-sidebar").tabs({show: 'fade', hide: 'fade', active: 0});
    $('#ipes-info-table').DataTable({
      "language": {
        "url": "./static/json/datatables_pt-br.json"
      },
    });

    EventBus.$on("infoIpes", infoIpes => {
      this.setInfoIpes(infoIpes);
    });
    EventBus.$on("switchInfoIpes", isVisible => {
      this.isVisible = isVisible
    });
  },
  watch: {
    isVisible() {
      if(this.isVisible) {
        $("#info-ipes-right-sidebar").removeClass("hide-visually");
      } else {
        $("#info-ipes-right-sidebar").addClass("hide-visually");
      }
    }
  },
  methods: {
    setInfoIpes: function(infoIpes) {
      $("#info-ipes-right-sidebar").tabs("option", "active", 0);

      $('#polosBarChart').remove();
      $('#graphContainer').append('<canvas id="polosBarChart"><canvas>');

      this.id = null;
      this.sigla = infoIpes.sigla;
      this.arquivo = infoIpes.arquivo;
      this.nome = infoIpes.sigla;
      this.endereco.logradouro = infoIpes.logradouro;
      this.bairro = infoIpes.bairro;
      this.cidade = infoIpes.cidade;
      this.estado = infoIpes.estado;
      this.cep = infoIpes.cep;
      this.telefone = infoIpes.telefone;
      this.url = infoIpes.url;

      var myBarChart = loadChart("polosBarChart", "bar", "Polos");
      processBarChartIpesWithSiglaIpes(myBarChart, this.sigla);
    }
  },
  filters: {
    formataCep: function(cep) {
      if (!cep) return "";
      var primeiraparte = cep.substr(0, 5);
      var segundaparte = cep.substr(5, 3);
      var cepcompleto = primeiraparte + "-" + segundaparte;
      return cepcompleto;
    },
    formataTelefone: function(telefone) {
      if (!telefone) return "";
      var primeiraparte = telefone.substr(0, 9);
      var segundaparte = telefone.substr(9, 4);
      var telefonecompleto = primeiraparte + "-" + segundaparte;
      return telefonecompleto;
    },
    formataEndereco: function(logradouro, numero) {
      if (!logradouro || !numero) return "";
      return logradouro + ", " + numero;
    }
  }
};
</script>

<style>

</style>


