function loadMap(mapId) {
  mapboxgl.accessToken = 'pk.eyJ1IjoiZ3JlZXZpbiIsImEiOiJjamU3b3ZwbGowNG5oMnlxdjVoYXoxbGdjIn0.qX2DwLHD_0QwRGUhAeh0Cg';
  var map = new mapboxgl.Map({
    container: mapId,
    style: 'mapbox://styles/greevin/cjea7kekd2d0s2sna9n60xb31',
    zoom: 3.5,
    center: [-51.540733, -14.720560],
  });

  map.on('load', function () {
    // add navigation control
    var nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'top-left');

    // add layers button
    var layers = new LayersControl();
    map.addControl(layers, 'top-left');

    // carrega os polos
    map.addSource("polos", {
      type: 'vector',
      url: 'mapbox://greevin.cje8m702v00di2wr40hykvgtq-66bqr'
    });

    // adiciona os círculos nos polos
    map.addLayer({
      'id': 'polos',
      'type': 'circle',
      'source': 'polos',
      'source-layer': 'polos-insert',
      'layout': {
        'visibility': 'visible'
      },
      "paint": {
        "circle-color": '#4FB0C6',
        "circle-stroke-width": 2,
        "circle-stroke-color": '#000',
        "circle-radius": {
          "base": 1,
          "stops": [
            // zoom is 0 -> radius will be 5px
            [0, 2],
            // zoom is 5 -> radius will be 15px
            [22, 17]
          ]
        }
      }
    });

    // carrega os ipes
    map.addSource("ipes", {
      type: "vector",
      url: "mapbox://greevin.cje8mbo920q6b2wmrjxsi17jc-840cb"
    });

    // carrega o pin e adiciona no layer dos ipes
    map.loadImage('./style/images/pin.png', function (error, image) {
      if (error) throw error;
      map.addImage('pin', image);
      map.addLayer({
        'id': 'ipes',
        'type': 'symbol',
        'source': 'ipes',
        'source-layer': 'ipes-insert',
        layout: {
          "icon-image": "pin",
          'visibility': 'visible'
          // 'icon-allow-overlap': true,
          // 'icon-size': 1.5
        }
      });
    });

    // cria um novo popup
    var popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });

    var title = document.getElementById('location-title');
    var description = document.getElementById('location-description');

    // muda o cursor para pointer quando entrar em um polo
    // adiciona o popup com o nome fantasia do polo
    map.on('mouseenter', 'polos', function (e) {
      map.getCanvas().style.cursor = 'pointer';

      var coordinates = e.lngLat;
      var nome_fantasia = e.features[0].properties.nome_fantasia;

      popup.setLngLat(coordinates)
        .setText(nome_fantasia.toUpperCase())
        .addTo(map);
    });

    // o cursor volta ao padrão ao sair
    map.on('mouseleave', 'polos', function () {
      map.getCanvas().style.cursor = '';
      popup.remove();
    });

    map.on('click', 'polos', function(e) {
      EventBus.$emit('idPolo', e.features[0].id);

      // $('#polosBarChart').remove();
      // $('#graphContainer').append('<canvas id="polosBarChart"><canvas>');
      //
      // var myBarChart = loadChart("polosBarChart", "bar", "Polos");
      // var sigla = e.features[0].properties.sigla;
      // processBarChartIpesWithSiglaIpes(myBarChart, sigla);
    });

    // muda o cursor quando entrar em um ipes
    // adiciona o popup com a sigla do ipes
    map.on('mouseenter', 'ipes', function (e) {
      map.getCanvas().style.cursor = 'pointer';

      var coordinates = e.lngLat;
      var sigla = e.features[0].properties.sigla;

      popup.setLngLat(coordinates)
        .setText(sigla.toUpperCase())
        .addTo(map);

    });

    map.on('click', 'ipes', function(e) {
      EventBus.$emit('siglaIpes', e.features[0].properties);

      $('#polosBarChart').remove();
      $('#graphContainer').append('<canvas id="polosBarChart"><canvas>');

      var myBarChart = loadChart("polosBarChart", "bar", "Polos");
      var sigla = e.features[0].properties.sigla;
      processBarChartIpesWithSiglaIpes(myBarChart, sigla);
    });

    // o cursor volta ao padrão ao sair
    map.on('mouseleave', 'ipes', function () {
      map.getCanvas().style.cursor = '';
      popup.remove();
    });
  });
}

class LayersControl {
  onAdd(map) {
    this._map = map;
    this._button = document.createElement('button');
    this._button.className = 'mapboxgl-ctrl-icon mapboxgl-ctrl-layers';
    this._button.addEventListener('click', function() { 
      // this.className = 'mapboxgl-ctrl-icon teste';
      // this.appendChild(document.getElementById("menu"))
     }, false);
    this._container = document.createElement('div');
    this._container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
    this._container.appendChild(this._button)
    return this._container;
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}