<template>
<right-sidebar id="initial-sidebar">
  <template slot="tabs">
      <div class='px12 py12 bg-blue-faint txt-s'>
          <div class='grid'>
              <div class='col col--11'>
                  <div class="txt-l txt-bold mb-neg3">Sistema Universidade Aberta do Brasil</div>
              </div>
              <div class='col col--1 block cursor-pointer' style="margin: auto;" v-on:click="closeSidebar()">
                  <svg class="icon h24 w24 mx-auto mx-auto">
                      <use xlink:href="#icon-close"></use>
                  </svg>
              </div>
          </div>
      </div>
    <ul class="tabs bg-blue border-b border--white flex-parent h40 txt-bold txt-s"
            style="justify-content:space-around;">
            <li class="mb-neg1 px12 py6 border-b border--white border--white-on-active color-lighten50 color-white-on-active color-lighten75-on-hover">
                <a href="#tab-principal">Principal</a>
            </li>
            <li class="mb-neg1 px12 py6 border-b border--white border--white-on-active color-lighten50 color-white-on-active color-lighten75-on-hover">
                <a href="#tab-sobre">Sobre o Projeto</a>
            </li>
            <li class="mb-neg1 px12 py6 border-b border--white border--white-on-active color-lighten50 color-white-on-active color-lighten75-on-hover">
                <a href="#tab-dados">Dados</a>
            </li>
        </ul>
  </template>
  <template slot="content">
    <div class='px12 py12 scroll-auto'>
      <div id="tab-principal">
        <principal></principal>
      </div>
      <div id="tab-sobre">
        <sobre></sobre>
      </div>
      <div id="tab-dados">
        <dados></dados>
      </div>
    </div>
  </template>
</right-sidebar>
</template>

<script>
import Principal from './Principal';
import Sobre from './Sobre';
import Dados from './Dados';
$(function () {
    $("#initial-sidebar").tabs({show: 'fade', hide: 'fade', active: 0});
});
export default {
  data() {
    return {
      isVisible: true
    }
  },
  components: {
    'principal': Principal,
    'sobre': Sobre,
    'dados': Dados
  },
  methods: {
    closeSidebar: function() {
      $('#initial-sidebar').addClass("hide-visually");
    },
  }
};
</script>

<style>

</style>


