<template>
<right-sidebar id="info-polos-right-sidebar">
  <template slot="tabs">
      <div class='px12 py12 bg-blue-faint txt-s'>
          <div class='grid'>
              <div class='col col--1 block cursor-pointer' style="margin: auto;" v-on:click="backToInitialSidebar()">
                  <svg class="icon h24 w24 mx-auto mx-auto">
                      <use xlink:href="#icon-arrow-left"></use>
                  </svg>
              </div>
              <div class='col col--10'>
                  <div class="txt-l txt-bold mb-neg3">{{ nome_polo }}</div>
              </div>
              <div class='col col--1 block cursor-pointer' style="margin: auto;" v-on:click="closeSidebar()">
                  <svg class="icon h24 w24 mx-auto mx-auto">
                      <use xlink:href="#icon-close"></use>
                  </svg>
              </div>
          </div>

      </div>
    <ul class="tabs bg-blue border-b border--white flex-parent h40 txt-bold txt-s"
            style="justify-content:space-around;height: 35px;">
            <li class="mb-neg1 px12 py6 border-b border--white border--white-on-active color-lighten50 color-white-on-active color-lighten75-on-hover">
                <a href="#info-polos-tab-info-gerais">Informações Gerais</a>
            </li>
            <li id="polos-tab-dados" class="hide-visually mb-neg1 px12 py6 border-b border--white border--white-on-active color-lighten50 color-white-on-active color-lighten75-on-hover">
                <a href="#info-polos-tab-dados">Dados</a>
            </li>
        </ul>
  </template>
  <template slot="content">
    <div class='px12 py12 scroll-auto set-height'>
      <div id="info-polos-tab-info-gerais" v-show="id">
        <div class='grid'>
            <!--Endereço-->
            <div class='col col--1 block' style="margin: auto;" v-if="endereco.logradouro.length > 2">
                <svg class="icon h24 w24 mx-auto mx-auto">
                    <use xlink:href="#icon-street"></use>
                </svg>
            </div>
            <div class='col col--11 my6' v-if="endereco.logradouro.length > 2">
                <div class="txt-s txt-bold mb-neg3">
                    <p>Endereço</p>
                </div>
                <div class="txt-m txt-capitalize">
                    <p>{{ endereco.logradouro | formataEndereco(endereco.numero) | allLowercase }}</p>
                </div>
            </div>
            <!--Fim do Logradouro-->
            <!--Bairro-->
            <div class='col col--1 block' style="margin: auto;" v-if="bairro !== 'NULL'">
                <svg class="icon h24 w24 mx-auto">
                    <use xlink:href="#icon-home"></use>
                </svg>
            </div>
            <div class='col col--11 my6' v-if="bairro !== 'NULL'">
                <div class="txt-s txt-bold mb-neg3">
                    <p>Bairro</p>
                </div>
                <div class="txt-m txt-capitalize">
                    <p>{{ bairro | allLowercase }}</p>
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
            <!--Complemento-->
            <div class='col col--1 block' style="margin: auto;" v-if="endereco.complemento !== 'NULL'">
                <svg class="icon h24 w24 mx-auto">
                    <use xlink:href="#icon-clipboard"></use>
                </svg>
            </div>
            <div class='col col--11 my6' v-if="endereco.complemento !== 'NULL'">
                <div class="txt-s txt-bold mb-neg3"><p>Complemento</p></div>
                <div class="txt-m">
                    <p>{{ endereco.complemento }}</p>
                </div>
            </div>
            <!--Fim do Complemento-->
            <!--Nome Fantasia-->
            <div class='col col--1 block' style="margin: auto;">
                <svg class="icon h24 w24 mx-auto">
                    <use xlink:href="#icon-quotes"></use>
                </svg>
            </div>
            <div class='col col--11 my6'>
                <div class="txt-s txt-bold mb-neg3"><p>Nome Fantasia</p></div>
                <div class="txt-m">
                    <p>{{ nome_fantasia }}</p>
                </div>
            </div>
            <!--Fim do Nome Fantasia-->
            <!--Telefone 1-->
            <div class='col col--1 block' style="margin: auto;" v-if="telefone_1 !== '()'">
                <svg class="icon h24 w24 mx-auto">
                    <use xlink:href="#icon-mobile"></use>
                </svg>
            </div>
            <div class='col col--11 my6' v-if="telefone_1 !== '()'">
                <div class="txt-s txt-bold mb-neg3"><p>Telefone</p></div>
                <div class="txt-m">
                    <p>{{ telefone_1 | formataTelefone }}</p>
                </div>
            </div>
            <!--Fim do Telefone 1-->
            <!--Telefone 2-->
            <div class='col col--1 block' style="margin: auto;" v-if="telefone_2 !== '()'"></div>
            <div class='col col--11 my6' v-if="telefone_2 !== '()'">
                <div class="txt-s txt-bold mb-neg3"><p>Telefone 2</p></div>
                <div class="txt-m">
                    <p>{{ telefone_2 | formataTelefone }}</p>
                </div>
            </div>
            <!--Fim do Telefone 2-->
            <!--Email 1-->
            <div class='col col--1 block' style="margin: auto;" v-if="email_1 !== 'NULL'">
                <svg class="icon h24 w24 mx-auto">
                    <use xlink:href="#icon-mail"></use>
                </svg>
            </div>
            <div class='col col--11 my6' v-if="email_1 !== 'NULL'">
                <div class="txt-s txt-bold mb-neg3"><p>E-mail</p></div>
                <div class="txt-m">
                    <a :href="`mailto:${email_1}`" class="link">{{ email_1 | allLowercase }}</a>
                </div>
            </div>
            <!--Fim do Email 1-->
            <!--Email 2-->
            <div class='col col--1 block' style="margin: auto;" v-if="email_2 !== 'NULL'"></div>
            <div class='col col--11 my6' v-if="email_2 !== 'NULL'">
                <div class="txt-s txt-bold mb-neg3"><p>E-mail 2</p></div>
                <div class="txt-m">
                    <a :href="`mailto:${email_2}`" class="link">{{ email_2 | allLowercase }}</a>
                </div>
            </div>
            <!--Fim do Email 2-->
        </div>
    </div>
        <div id="info-polos-tab-dados">
            <table id="polos-info-table" class="display" cellspacing="0" width="100%">
                <thead>
                <tr>
                    <th>Sigla</th>
                    <th>Estado</th>
                    <th>Polo</th>
                    <th>Estado</th>
                </tr>
                </thead>
            </table>

            <hr class='txt-hr'>

            <!--carrega os gráficos-->
            <div id="ipesGraphContainer">
                <div class="txt-m txt-bold mb6">
                    <p>Número de IPES por estado</p>
                </div>
            </div>
        </div>
    </div>
  </template>
</right-sidebar>
</template>

<script>
import { EventBus } from "../eventBus";
import { loadChart, processBarChartIpesByState } from '../functions';

export default {
  data() {
    return {
      id: "",
      sigla: "",
      nome_polo: "",
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
      telefone_1: "",
      telefone_2: "",
      email_1: "",
      email_2: "",
      url: "",
      isVisible: false
    };
  },
  mounted() {
    $("#info-polos-right-sidebar").tabs({ show: "fade", hide: "fade", active: 0 });

    EventBus.$on("infoPolo", infoPolo => {
      this.setInfoPolo(infoPolo);
      this.loadPolosDataTable(infoPolo);
      this.loadGraph(infoPolo)
    });
    EventBus.$on("switchInfoPolos", isVisible => {
      this.isVisible = isVisible
    });
  },
  watch: {
    isVisible() {
      if(this.isVisible) {
        $('#initial-sidebar').addClass("hide-visually");
        $("#info-polos-right-sidebar").removeClass("hide-visually");
      } else {
        $('#initial-sidebar').removeClass("hide-visually");
        $("#info-polos-right-sidebar").addClass("hide-visually");
      }
    }
  },
  methods: {
    backToInitialSidebar: function() {
      $('#initial-sidebar').removeClass("hide-visually");
      $("#info-polos-right-sidebar").addClass("hide-visually");
    },
    closeSidebar: function() {
      $('#initial-sidebar').addClass("hide-visually");
      $("#info-polos-right-sidebar").addClass("hide-visually");
    },
    loadGraph(infoPolo) {
      $('#ipesBarChart').remove();
      $('#ipesGraphContainer').append('<canvas id="ipesBarChart"><canvas>');

      var myBarChart = loadChart("ipesBarChart", "bar", "IPES");
      processBarChartIpesByState(myBarChart, infoPolo.id);
    },
    loadPolosDataTable: function(infoPolo) {
      let polosTable = $('#polos-info-table').DataTable({
        "retrieve": true,
        "ajax": {
          "url": "./static/json/ipesdatatable.json",
          "dataSrc": "data"
        },
        "language": {
          "url": "./static/json/datatables_pt-br.json",
        },
        "columns": [
          { "data": "sigla_ipes" },
          { "data": "estado_ipes" },
          { "data": "nome_polo" },
          { "data": "estado_polo" }
        ],
        "columnDefs": [
          { "width": "40%", "targets": 0 },
          { "width": "10%", "targets": 1 },
          {
            "targets": [2, 3],
            "visible": false,
          }
        ]
      }).columns(2)
        .search("^" + infoPolo.nome_polo + "$", true, false, true)
        .draw();
    },
    setInfoPolo: function(infoPolo) {
      $("#info-polos-right-sidebar").tabs("option", "active", 0);
      $("#info-polos-right-sidebar").removeClass("hide-visually");

      this.sigla = null;
      this.id = infoPolo.id;
      this.nome_polo = infoPolo.nome_polo;
      this.endereco.logradouro = infoPolo.logradouro;
      this.endereco.numero = infoPolo.numero;
      this.bairro = infoPolo.bairro;
      this.cidade = infoPolo.cidade;
      this.estado = infoPolo.uf;
      this.cep = infoPolo.cep;
      this.endereco.complemento = infoPolo.complemento;
      this.nome_fantasia = infoPolo.nome_fantasia;
      this.telefone_1 = infoPolo.telefone1;
      this.telefone_2 = infoPolo.telefone2;
      this.email_1 = infoPolo.email1;
      this.email_2 = infoPolo.email2;
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
      if(numero === "0") {
        return logradouro;
      } else {
        return logradouro + ", " + numero;
      }
    },
    allLowercase: function(txt) {
      if (!txt ) return "";
      return txt.toLowerCase()
    }
  }
};
</script>

<style>

</style>


