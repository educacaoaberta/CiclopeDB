import mapboxgl from 'mapbox-gl';
import {EventBus} from './eventBus';

const accessToken = 'pk.eyJ1IjoibWFwYXVhYiIsImEiOiJjamVpbDZsazgzNWJyMnFxZTN0Z2diczc5In0.x09vnBwbadLIJ-HMq-E8sg';

const brasilStyle = 'mapbox://styles/mapauab/cjeil7fjv0rxm2ro2jll0x412';

const pinIpesImage = require('./images/pin.png');

const ipesInfo = './static/json/ipes.geojson';
const polosInfo = './static/json/polos.geojson';
const ipesPolosInfo = './static/json/ipespolos.json';

let layerIDs = [];

export {search, map}

// chave de acesso do Mapbox
mapboxgl.accessToken = accessToken;

// configura um novo mapa
let map = new mapboxgl.Map({
  container: 'map',
  style: brasilStyle,
  zoom: 3.5,
  center: [-41.540733, -14.720560],
  minZoom: 3.5,
  maxZoom: 12,
  tolerance: 3.5,
  trackResize: true
});

// cria um novo popup
let popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false
});

// ao carregar o mapa
map.on('load', function () {
  // adiciona o botão de busca
  const searchControl = new SearchControl(true);
  map.addControl(searchControl, 'top-left');

  // adiciona os controles do mapa
  let navControl = new mapboxgl.NavigationControl();
  map.addControl(navControl, 'top-left');

  // adiciona o menu das camadas
  const layersControl = new LayersControl();
  map.addControl(layersControl, 'top-left');

  addIpesLayer();
  addPolosLayer();
  addIpesPolos();
});

// cria a camada dos Ipes
function addIpesLayer() {
  map.addSource("ipes", {
    type: "geojson",
    data: ipesInfo
  });

  $.getJSON(ipesInfo, function (data) {
    map.loadImage(pinIpesImage, function (error, image) {
      map.addImage('pin-ipes', image);
      map.addLayer({
        'id': 'ipes',
        'type': 'symbol',
        'source': 'ipes',
        'layout': {
          'visibility': 'visible',
          "icon-image": "pin-ipes",
          "icon-allow-overlap": true
        }
      });
      // search();
    });

  });
  // quando o cursor entra em um IPES
  map.on('mouseenter', 'ipes', function (e) {
    map.getCanvas().style.cursor = 'pointer';

    let coordinates = e.features[0].geometry.coordinates.slice();
    let sigla = e.features[0].properties.sigla;

    popup.setLngLat(coordinates)
      .setText(sigla.toUpperCase())
      .addTo(map);
  });

  // o cursor volta ao padrão ao sair
  map.on('mouseleave', 'ipes', function () {
    map.getCanvas().style.cursor = '';
    popup.remove();
  });

  // ao clicar em um IPES
  map.on('click', 'ipes', function (e) {
    EventBus.$emit('infoIpes', e.features[0].properties);

    if (!e.features.length) return;

    const feature = e.features[0];

    const ipes_id = feature.properties.id;
    let polosId = [];
    $.getJSON(ipesPolosInfo, function (data) {
      data.forEach(function(row) {
        if(row.ipes_id === Number(ipes_id)) {
          polosId.push(row.polos_id);
        }
      });

      map.setLayoutProperty('ipes-polos', 'visibility', 'visible');
      let filter_expression = ['any'];
      polosId.forEach((polo_id) => {
        filter_expression.push(['==' , 'id', String(polo_id)])
      });
      map.setFilter('ipes-polos', filter_expression);
    });

    EventBus.$emit('switchInfoPolos', false);
    EventBus.$emit('switchInfoIpes', true);
  });
}

function search(value) {

  if (value !== undefined && value.length) {
    map.setFilter('ipes', ['==', 'sigla', value]);
    map.setLayoutProperty('polos', 'visibility', 'visible');
    map.setFilter('polos', ['==', 'nome_polo', value]);
  } else {
    map.setFilter('ipes', ['!=', 'sigla', '']);
    map.setFilter('polos', ['!=', 'nome_polo', '']);
    map.setLayoutProperty('polos', 'visibility', 'none');
  }
}

// cria a camada dos Polos
function addPolosLayer() {
  map.addSource("polos", {
    type: 'geojson',
    data: polosInfo,
  });

  map.addLayer({
    'id': 'polos',
    'type': 'symbol',
    'source': 'polos',
    'layout': {
      'visibility': 'none',
      "icon-image": "college-15",
      "icon-allow-overlap": true,
    }
  });

  // o cursor volta ao padrão ao sair
  map.on('mouseleave', 'polos', function () {
    map.getCanvas().style.cursor = '';
    popup.remove();
  });

  // muda o cursor para pointer quando entrar em um polo
  // adiciona o popup com o nome fantasia do polo
  map.on('mouseenter', 'polos', function (e) {
    map.getCanvas().style.cursor = 'pointer';

    let coordinates = e.features[0].geometry.coordinates.slice();
    let nome_fantasia = e.features[0].properties.nome_fantasia;

    // configura o popup para mostrar o nome do polo
    popup.setLngLat(coordinates)
      .setText(nome_fantasia.toUpperCase())
      .addTo(map);
  });

  // ao clicar em um polo...
  map.on('click', 'polos', function (e) {
    EventBus.$emit('infoPolo', e.features[0].properties);

    EventBus.$emit('switchInfoIpes', false);
    EventBus.$emit('switchInfoPolos', true);
  });
}

// cria a camada dos Polos quando clicado em um IPES
function addIpesPolos() {
  map.addSource("ipes-polos", {
    type: 'geojson',
    data: polosInfo,
  });

  map.addLayer({
    'id': 'ipes-polos',
    'type': 'symbol',
    'source': 'ipes-polos',
    'layout': {
      'visibility': 'none',
      "icon-image": "college-15",
      "icon-allow-overlap": true,
    }
  });

  map.on('mouseenter', 'ipes-polos', function (e) {
    map.getCanvas().style.cursor = 'pointer';

    let coordinates = e.features[0].geometry.coordinates.slice();
    let nome_polo = e.features[0].properties.nome_polo;

    // configura o popup para mostrar o nome do polo
    popup.setLngLat(coordinates)
      .setText(nome_polo.toUpperCase())
      .addTo(map);
  });

  // o cursor volta ao padrão ao sair
  map.on('mouseleave', 'ipes-polos', function () {
    map.getCanvas().style.cursor = '';
    popup.remove();
  });

  map.on('click', 'ipes-polos', function (e) {
    EventBus.$emit('infoPolo', e.features[0].properties);

    EventBus.$emit('switchInfoIpes', false);
    EventBus.$emit('switchInfoPolos', true);
  });
}

class LayersControl {

  onAdd(map) {
    this._map = map;
    this._button = document.createElement('button');
    this._button.className = 'mapboxgl-ctrl-icon mapboxgl-ctrl-layers';
    this._button.setAttribute("aria-label", "Camadas");

    this._layermenu = document.getElementById("menu");

    // adiciona o botão em um container
    this._container = document.createElement('div');
    this._container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
    this._container.appendChild(this._layermenu);
    this._container.appendChild(this._button);

    // ao entrar no container
    this._container.addEventListener('mouseenter', function() {
      let menu = this.firstChild;
      menu.className = '';

      menu.addEventListener('click', function() {
        let input = $("#menu").find("input" );
        for (let i = 0; i < input.length; i++) {
          let visibility = map.getLayoutProperty(input[i].id, 'visibility');

          if(input[i].checked === true) {
            map.setLayoutProperty(input[i].id, 'visibility', 'visible');
          } else {
            map.setLayoutProperty(input[i].id, 'visibility', 'none');
          }
        }
      });
    }, false);

    // ao deixar o container
    this._container.addEventListener('mouseleave', function () {
      this.firstChild.className = 'hide-visually'
    }, false);

    return this._container;
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}

class SearchControl {
  constructor(hidden) {
    this._hidden = hidden;
  }

  onAdd(map) {
    this._map = map;
    this._button = document.createElement('button');
    this._button.className = 'mapboxgl-ctrl-search-icon mapboxgl-ctrl-layers';
    this._button.setAttribute("aria-label", "Pesquisa");

    this._search = document.getElementById("search");

    // adiciona o botão em um container
    this._container = document.createElement('div');
    this._container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
    this._container.appendChild(this._search);
    this._container.appendChild(this._button);

    this._button.addEventListener('click', () => {
      let search = this._container.firstChild;

      if (this._hidden) {
        search.classList.remove("hide-visually");
        this._container.childNodes[1].classList.remove("mapboxgl-ctrl-search-icon");
        this._container.childNodes[1].className = "mapboxgl-ctrl-close-icon mapboxgl-ctrl-layers";
      } else {
        search.className = "filter-ctrl hide-visually";
        this._container.childNodes[0].childNodes[0].parentNode[0].value = '';
        map.setFilter('ipes', ['!=', 'sigla', ''])
        this._container.childNodes[1].classList.remove("mapboxgl-ctrl-close-icon");
        this._container.childNodes[1].className = "mapboxgl-ctrl-search-icon mapboxgl-ctrl-layers";
      }

      this._hidden = !this._hidden;

    }, false);

    return this._container;
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}
