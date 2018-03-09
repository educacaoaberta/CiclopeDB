function loadMap(mapId) {

  var accessToken = 'pk.eyJ1IjoibWFwYXVhYiIsImEiOiJjamVpbDZsazgzNWJyMnFxZTN0Z2diczc5In0.x09vnBwbadLIJ-HMq-E8sg';
  var brasilStyle = 'mapbox://styles/mapauab/cjeil7fjv0rxm2ro2jll0x412';
  var ipesLayer = 'mapbox://mapauab.cjeim2fzs0tfi2qmo3w4mqixu-1qo7e';
  var ipesSourceLayer = 'ipes-data';
  var polosLayer = 'mapbox://mapauab.cjeim1kte2inx39o7p1owd9ei-97832';
  var polosSourceLayer = 'polos-data';
  var pinImage = './style/images/pin.png';

  mapboxgl.accessToken = accessToken;
  var map = new mapboxgl.Map({
    container: mapId,
    style: brasilStyle,
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
    var layersControl = new LayersControl();
    map.addControl(layersControl, 'top-left');

    // carrega os polos
    map.addSource("polos", {
      type: 'vector',
      url: polosLayer
    });

    // adiciona os círculos nos polos
    map.addLayer({
      'id': 'polos',
      'type': 'circle',
      'source': 'polos',
      'source-layer': polosSourceLayer,
      'layout': {
        'visibility': 'visible'
        'visibility': 'none'
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
      url: ipesLayer
    });

    // carrega o pin e adiciona no layer dos ipes
    map.loadImage(pinImage, function (error, image) {
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
      EventBus.$emit('idPolo', e.features[0].properties.id);

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

      // remove a div e adiciona para que não se repita o gráfico
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

    this._layermenu = document.getElementById("menu");

    // adiciona o botão em um container
    this._container = document.createElement('div');
    this._container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
    this._container.appendChild(this._layermenu)
    this._container.appendChild(this._button)

    // ao entrar no container
    this._container.addEventListener('mouseenter', function() {
      let menu = this.firstChild
      console.log(this)
      menu.className = ''

      menu.addEventListener('click', function() {
        let input = $( "#menu input" );
        for (let i = 0; i < input.length; i++) {
          let visibility = map.getLayoutProperty(input[i].id, 'visibility');

          console.log(input[i].id + ": " + visibility)
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