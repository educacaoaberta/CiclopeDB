//free icons from http://icon-park.com/icon/simple-location-map-pin-icon4-purple-free-vector-data/

var map;
$(function() {

//add leaflet map and set maxview and minview;
var base = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  });

//add search
// var searchLayer = function(query, cb) {
//   //var d = $.Deferred()
//   // [{"loc":[41.57573,13.002411],"title":"black"},{"loc":[41.807149,13.162994],"title":"blue"}
//   //f.properies.XXXX, where XXXX defines what element search will be run on (Nome, in this case)
//   var json = UFMT.features.map(function(f) {
//   return {loc: [f.geometry.coordinates[1], f.geometry.coordinates[0]], title: f.properties.cidade}
//   })
//   // return d.resolve(json)
//   json = json.filter(function(result) {
//     return RegExp(query.toLowerCase()).test(result.title.toLowerCase())
//     })
//     cb(json)
//     };

var ipes = L.geoJson(null, {
  onEachFeature: onEachFeature
    });
  $.getJSON("json/ipes.json", function (data) {
    ipes.addData(data);
    });

var brasil = L.geoJson(null, {
  style: {
    weight: 2,
    color: "#fff",
    opacity: 1,
    fillColor: "#dddddd",
    fillOpacity: 0.9
    }
    });
    $.getJSON("br.json", function(data) {
      brasil.addData(data);
    });

//precisa ser criada uma função que consiga pegar os dados de ipes.json (Sigla)
//e cries as vars automaticamente.
var UFMT = L.geoJson(null, {onEachFeature: onEachPolo, pointToLayer: pointToLayer});
var UFF = L.geoJson(null, {onEachFeature: onEachPolo, pointToLayer: pointToLayer});
var UFOP = L.geoJson(null, {onEachFeature: onEachPolo, pointToLayer: pointToLayer});
var UFPA = L.geoJson(null, {onEachFeature: onEachPolo, pointToLayer: pointToLayer});
var UFC = L.geoJson(null, {onEachFeature: onEachPolo, pointToLayer: pointToLayer});
var rest = L.geoJson(null, {onEachFeature: onEachPolo, pointToLayer: pointToLayer});
var polos = L.layerGroup([UFMT,UFF,UFOP,UFPA,UFC]);

$.getJSON("json/polos.json", function (data) {
  $.each(data.features, function (key, val) {
    switch (val.properties.ipes) {
    case "UFMT": UFMT.addData(val); break;
    case "UFF": UFF.addData(val); break;
    case "UFOP": UFOP.addData(val); break;
    case "UFPA": UFPA.addData(val); break;
    case "UFC": UFC.addData(val); break;
    default: rest.addData(val);
    }
    });
    });

function pointToLayer (feature, latlng) {
  return L.circleMarker(latlng, {
  radius: 6, weight: 1,
  fillColor: "#1DA7D2", color: "#0F3153",
  opacity: 1, fillOpacity: 0.6
  });
  }

function onEachPolo (feature, layer) {
  layer.on ('click', function (f) {
    f.target.bindPopup(feature.properties.cidade).openPopup();
    });
  //Does not work well with circles, but does with markers. Bug?
  // layer.on ('mouseout', function (a) {
  //   a.target.closePopup();
  // });
  }

var ipesIcon = L.icon({
  iconUrl: 'icons/purple.png',
  iconSize: [30, 30],
  iconAnchor: [10, 30],
  popupAnchor: [6, -30]
  });

//layers = those that are visible onLoad
var map = L.map('map', {layers: [ipes, brasil]}).setView(new L.LatLng(-14.953349393643416,-52.220703125),5);
  // map.fitBounds([[-35.206527, -86.578939],[5.182375, -20.441244]]);
  map._layersMaxZoom= 10;
  map._layersMinZoom= 5;

var baseMaps = {"Mapa": base};

var overlayMaps = {
  "Mapa político": base,
  "Traço": brasil,
  "Núcleos": ipes,
  "Polos": polos
  };

// add locate button
L.control.locate().addTo(map);


//adds controls but also adds al layews to map
L.control.layers(baseMaps, overlayMaps,{position: 'topleft'}).addTo(map);
// map.addControl( new L.Control.Search({ callData: searchLayer }) );

// set sidebar
var sidebar = L.control.sidebar('sidebar', {
  position: 'right'
  });
  map.addControl(sidebar);

//each pin clicked will call the related .html available in the json file (Arquivo)
function onEachFeature (ipes, layer) {
  layer.setIcon(ipesIcon);
  layer.on ('mouseover', function (f) {
    f.target.bindPopup("<img src=" + "images/" + ipes.properties.Sigla + ".png" + "> <br>" + ipes.properties.Sigla).openPopup();
    });
  layer.on("click", function() {
    $("#sidebar").load(ipes.properties.Arquivo)
    //$(".about").hide();
    //o ipes.properties.Sigla retorna uma string. Quando essa é comparada usando o
    //polos.hasLayer(ipes.properties.Sigla) retorna falso, já que a VAR acima não é string.
    //Problema não resolvido.
    if (ipes.properties.Sigla == "UFF") {
      map.hasLayer(UFF) ? ("", sidebar.toggle() ) : (map.addLayer(UFF), sidebar.show());
      map.hasLayer(UFMT) ? map.removeLayer(UFMT) : "";
      map.hasLayer(UFOP) ? map.removeLayer(UFOP) : "";
      map.hasLayer(UFPA) ? map.removeLayer(UFPA) : "";
      map.hasLayer(UFC) ? map.removeLayer(UFC) : "";
      }
    if (ipes.properties.Sigla == "UFMT") {
      map.hasLayer(UFMT) ? ("", sidebar.toggle() ) : (map.addLayer(UFMT), sidebar.show());
      map.hasLayer(UFF) ? map.removeLayer(UFF) : "";
      map.hasLayer(UFOP) ? map.removeLayer(UFOP) : "";
      map.hasLayer(UFPA) ? map.removeLayer(UFPA) : "";
      map.hasLayer(UFC) ? map.removeLayer(UFC) : "";
      }
    if (ipes.properties.Sigla == "UFOP") {
      map.hasLayer(UFOP) ? ("", sidebar.toggle() ) : (map.addLayer(UFOP), sidebar.show());
      map.hasLayer(UFF) ? map.removeLayer(UFF) : "";
      map.hasLayer(UFMT) ? map.removeLayer(UFMT) : "";
      map.hasLayer(UFPA) ? map.removeLayer(UFPA) : "";
      map.hasLayer(UFC) ? map.removeLayer(UFC) : "";
    }
    if (ipes.properties.Sigla == "UFPA") {
       map.hasLayer(UFPA) ? ("", sidebar.toggle() ) : (map.addLayer(UFPA), sidebar.show());
       map.hasLayer(UFF) ? map.removeLayer(UFF) : "";
       map.hasLayer(UFMT) ? map.removeLayer(UFMT) : "";
       map.hasLayer(UFOP) ? map.removeLayer(UFOP) : "";
       map.hasLayer(UFC) ? map.removeLayer(UFC) : "";
    }
    if (ipes.properties.Sigla == "UFC") {
       map.hasLayer(UFC) ? ("", sidebar.toggle() ) : (map.addLayer(UFC), sidebar.show());
       map.hasLayer(UFF) ? map.removeLayer(UFF) : "";
       map.hasLayer(UFMT) ? map.removeLayer(UFMT) : "";
       map.hasLayer(UFOP) ? map.removeLayer(UFOP) : "";
       map.hasLayer(UFPA) ? map.removeLayer(UFPA) : "";
    }
    });
  }

//Creates the menu and loads clicked content on the sidebar
//Since "menu" is under the "map" div ("absolute" map position makes this necessary)
//clicking on map to remove sidebar is now a problem but also is useful
$(".menuitem").show();
$('.menuitem').click(function(){
  sidebar.show();
  //gets "name" from the <a> menu tag above to toggle HTML file for content
  var menuselected = $(this).attr("name");
  $("#sidebar").load("content/" + menuselected);
  });

// for hiding the sidebar and showing the "about" div again
// map.on("click",function() {
//   sidebar.hide();
//   $(".about").show();
// });


}); //main function
