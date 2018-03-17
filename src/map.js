import mapboxgl from 'mapbox-gl';
import { EventBus } from './eventBus';

const accessToken = 'pk.eyJ1IjoibWFwYXVhYiIsImEiOiJjamVpbDZsazgzNWJyMnFxZTN0Z2diczc5In0.x09vnBwbadLIJ-HMq-E8sg';

const brasilStyle = 'mapbox://styles/mapauab/cjeil7fjv0rxm2ro2jll0x412';

const ipesHasPolosLayer = 'mapbox://mapauab.cjesqh5s609p232pgznx605lb-4sy16';
const ipesHasPolosSourceLayer = 'polos-ipes';

const ipesLayer = 'mapbox://mapauab.cjeim2fzs0tfi2qmo3w4mqixu-1qo7e';
const ipesSourceLayer = 'ipes-data';

const polosLayer = 'mapbox://mapauab.cjever2si0g1h2wmmn5q5s33b-0xclz';
const polosSourceLayer = 'polos-data';

const pinImage = require('./images/pin.png');

mapboxgl.accessToken = accessToken;
let map = new mapboxgl.Map({
  container: 'map',
  style: brasilStyle,
  zoom: 3.5,
  center: [-41.540733, -14.720560],
  minZoom: 3.5,
  maxZoom: 15,
  trackResize: true
});

// cria um novo popup
let popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false
});

map.on('load', function() {
  // add navigation control
  let navControl = new mapboxgl.NavigationControl();
  map.addControl(navControl, 'top-left');

  // add layers button
  const layersControl = new LayersControl();
  map.addControl(layersControl, 'top-left');

  addIpesLayer();
  addPolosLayer();
  addIpesHasPolos();
});

function addIpesLayer() {
  // carrega os ipes
  map.addSource("ipes", {
    type: "vector",
    url: ipesLayer
  });

  // carrega o pin e adiciona no layer dos ipes
  map.loadImage(pinImage, function(error, image) {
    if (error) throw error;
    map.addImage('pin', image);
    map.addLayer({
      'id': 'ipes',
      'type': 'symbol',
      'source': 'ipes',
      'source-layer': ipesSourceLayer,
      layout: {
        "icon-image": "pin",
        'visibility': 'visible'
      }
    });
  });

  // muda o cursor quando entrar em um ipes
  // adiciona o popup com a sigla do ipes
  map.on('mouseenter', 'ipes', function(e) {
    map.getCanvas().style.cursor = 'pointer';

    let coordinates = e.lngLat;
    let sigla = e.features[0].properties.sigla;

    popup.setLngLat(coordinates)
      .setText(sigla.toUpperCase())
      .addTo(map);
  });

  // o cursor volta ao padrão ao sair
  map.on('mouseleave', 'ipes', function() {
    map.getCanvas().style.cursor = '';
    popup.remove();
  });

  // ao clicar em um ipes...
  map.on('click', 'ipes', function(e) {
    EventBus.$emit('infoIpes', e.features[0].properties);

    if (!e.features.length) return
    const feature = e.features[0];

    const sigla = feature.properties.sigla
    map.setLayoutProperty('centros', 'visibility', 'visible');
    map.setFilter('centros', ['all', ['==', 'ipes_sigla', sigla]]);

    EventBus.$emit('switchInfoPolos', false);
    EventBus.$emit('switchInfoIpes', true);
  });
}

function addPolosLayer() {
  // carrega os polos
  map.addSource("polos", {
    type: 'vector',
    url: polosLayer,
  });

  map.addLayer({
    'id': 'polos',
    'type': 'symbol',
    'source': 'polos',
    'source-layer': polosSourceLayer,
    'layout': {
      'visibility': 'none',
      "icon-image": "college-15",
    }
  });

  // o cursor volta ao padrão ao sair
  map.on('mouseleave', 'polos', function() {
    map.getCanvas().style.cursor = '';
    popup.remove();
  });

  // muda o cursor para pointer quando entrar em um polo
  // adiciona o popup com o nome fantasia do polo
  map.on('mouseenter', 'polos', function(e) {
    map.getCanvas().style.cursor = 'pointer';

    let coordinates = e.lngLat;
    let nome_fantasia = e.features[0].properties.nome_fantasia;

    // configura o popup para mostrar o nome do polo
    popup.setLngLat(coordinates)
      .setText(nome_fantasia.toUpperCase())
      .addTo(map);
  });

  // ao clicar em um polo...
  map.on('click', 'polos', function(e) {
    EventBus.$emit('infoPolo', e.features[0].properties);

    EventBus.$emit('switchInfoIpes', false);
    EventBus.$emit('switchInfoPolos', true);
  });
}

function addIpesHasPolos() {
  // carrega os all ipes (ipes_has_polos)
  map.addSource("polos-ipes", {
    type: "vector",
    url: ipesHasPolosLayer
  });

  map.addLayer({
    "id": "centros",
    "source": "polos-ipes",
    'source-layer': ipesHasPolosSourceLayer,
    "type": "symbol",
    layout: {
      'visibility': 'none',
      "icon-image": "college-15"
    }
  });

  map.on('mouseenter', 'centros', function(e) {
    map.getCanvas().style.cursor = 'pointer';

    let coordinates = e.lngLat;
    let nome_polo = e.features[0].properties.nome_polo;

    // configura o popup para mostrar o nome do polo
    popup.setLngLat(coordinates)
      .setText(nome_polo.toUpperCase())
      .addTo(map);
  });

  // o cursor volta ao padrão ao sair
  map.on('mouseleave', 'centros', function() {
    map.getCanvas().style.cursor = '';
    popup.remove();
  });

  map.on('click', 'centros', function(e) {
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
    this._container.addEventListener('mouseleave', function() {
      this.firstChild.className = 'hide-visually'
    }, false);

    return this._container;
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}
