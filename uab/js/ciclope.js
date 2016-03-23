//free icons from http://icon-park.com/icon/simple-location-map-pin-icon4-purple-free-vector-data/

var map;
var thisIpes;
var cursos;
var timelines;
$(function() {

//hide all timelines
$('.timelines').hide();

//loading data for dataTable
$.getJSON("json/cursos.json", function(data) {
    cursos = data.cursos;
  });

//loading data for timeline
$.getJSON("json/linhas.json", function (data){
  timelines = data;
});

//functions to menu
$('.menu').hide();

$('#menu-group').mouseover(
  function() {
    $('.menu').show();
  }
);

$('#menu-group').mouseout(
  function() {
    $('.menu').hide();
  }
);

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

var allLayers = {};

var polos = L.layerGroup();

// var ipes = L.geoJson(null, {
//   onEachFeature: onEachFeature
//     });

var ipes = L.geoJson(null, {
  onEachFeature: onEachFeature
    });

//Get data from php - begin
$.getJSON("model/ipes.php", function (data) {
  for (var i = 0; i < data.length; i++) {
    //Buscar um jeito melhor de fazer isso, talvez no php ou no sql mesmo
    val = {
         "type":"Feature",
         "properties": {
           "Nome" : null,
           "UAB" : null,
           "Sigla" : data[i].sigla,
           "Arquivo" : data[i].sigla.toLowerCase()+".html",
           "detalhes": {
             "Coordenadora": null,
             "Coordenadora adjunta": null,
             "Coordenador UAB": null,
             "Endereço": null,
             "Bairro": null,
             "Cidade": null,
             "Estado": null,
             "Telefone 1": null,
             "Telefone 2": null,
             "Telefone 3": null,
             "Email": null,
             "URL": null,
             "Alunos" : null
           }
         },
         "geometry":{
            "type":"Point",
            "coordinates":[
              parseFloat(data[i].lng),
              parseFloat(data[i].lat)
            ]
         }
      };

    // ipes.addLayer(marker);
    ipes.addData(val);
  }
});
//Get data from php - end

var brasil = L.geoJson(null, {
  style: {
    weight: 1,
    color: "#fff",
    opacity: 1,
    fillColor: "#ccc",
    fillOpacity: 1
    }
    });
    $.getJSON("geo/br_estados.json", function(data) {
      brasil.addData(data);
    });

//pegando dados dos polos - begin
  $.getJSON("model/polos.php?operation=allpolos",function (data) {
      for (var i = 0; i < data.length; i++) {
        var sigla = data[i].sigla;
        var cidade = data[i].cidade;
        var estado = data[i].uf;

        //Não consegui adicionar os polos de outra maneira, de modo que tivessem o comportamento que tinham antes
        var val = {
           "type":"Feature",
           "geometry":{
              "type":"Point",
              "coordinates":[
                parseFloat(data[i].lng),
                parseFloat(data[i].lat)
              ]
           },
           "properties":{
              "ipes":sigla,
              "cidade":cidade,
              "estado":estado
           }
        };

        //verificando se já não existe essa ipes definida no allLayers
        if (typeof allLayers[sigla] == 'undefined') {
          allLayers[sigla] =  L.geoJson(null, {onEachFeature: onEachPolo, pointToLayer: pointToLayer});
          polos.addLayer(allLayers[sigla]);
        }
        allLayers[sigla].addData(val);
      }
    });
//pegando dados dos polos - end


//Função que cria o marker como círculo para os polos
function pointToLayer (feature, latlng) {
  return L.circleMarker(latlng, {
  radius: 6, weight: 1,
  fillColor: "#267FCA", color: "#000",
  opacity: 1, fillOpacity: 0.6
  });
  }

//Função que associa o nome da cidade ao polo, e quando se clica abre o popup
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
  iconUrl: 'icons/pin.png',
  iconSize: [21, 30],
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
  "Traçado": brasil,
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
  // layer.setIcon(ipesIcon);
  layer.on ('mouseover', function (f) {
    f.target.bindPopup(ipes.properties.Sigla).openPopup();
    });

  layer.on("click", function() {
    thisIpes = ipes.properties.Sigla;
    $("#tab-1").load('content/' + ipes.properties.Arquivo);
    //tentativa de resolução
    for (var thisLayer in allLayers){
      if (thisLayer != thisIpes){
        map.removeLayer(allLayers[thisLayer]);
      }
      else{
        if (map.hasLayer(allLayers[thisLayer])){
          //this resolve the problem that hide sidebar when about-data is loaded
          if($('#about-data').is(":visible") ){
            $('#about-data').hide();
            $('#tabs-data').show();
            if (!sidebar.showed){
              sidebar.show();
            }
        }
        else
        {
          sidebar.toggle();
        }
        }
        else{
          map.addLayer(allLayers[thisLayer]);
          //sidebar_load();
          sidebar_load(thisLayer);
        }
        }
      }

    });
  }

//Creates the menu and loads clicked content on the sidebar
//Since "menu" is under the "map" div ("absolute" map position makes this necessary)
//clicking on map to remove sidebar is now a problem but also is useful
$(".menuitem").show();

$('.menuitem').click(function(){
  sidebar.show();

  $('#about-data').show();
  $('#tabs-data').hide();


  //gets "name" from the <a> menu tag above to toggle HTML file for content
  var menuselected = $(this).attr("name");
  $("#about-data").load("content/" + menuselected);
  });


  //function to load sidebar data correct --json version
  function sidebar_load (siglaAtual)
  {
    //used to know what's tab
    //TODO: achar um jeito melhor de resolver isso
    var thistab='tab-1';

    sidebar.show();

    $('#tabs-data').show();
    $('#about-data').hide();

    //loading data from second tab - begin

    //hide all datatables
    $('.table_data').hide();


    //hide all datatable
     $('.dataTables_wrapper').hide();

    //show only this
    $('#table_data_'+thisIpes.toLowerCase()+'_wrapper').show();
    $('#table_data_'+thisIpes.toLowerCase()).show();


    //if not existis this class, load data
    if(!$('#table_data_'+thisIpes.toLowerCase()+'_wrapper').length) {
      //load cursos data
      $.getJSON("model/cursos.php?sigla=" + siglaAtual ,function (data) {
            $('#table_data_'+thisIpes.toLowerCase()).DataTable( {
                   "language": {
                         "url": "json/datatables_pt-br.json"
                         },
                        "aaData" : data,
                        "paging": true,
                        "order": [0,'asc'],
                        dom: 'Bfrtip',
                        buttons: [
                           {
                            extend: 'csvHtml5',
                            title: 'data'
                          }
                          ]
                    });
        //dados chegando, com excessão do título que tem acento
      });

    }
     //loading data from second tab - end

     //loading data from third tab - begin

    //it's necessary the div be showed to timeline works
    if (!$('#tab-3').hasClass('current')) {
      $('#tab-3').addClass('current');
    } else {
      thistab = 'tab-3';
    }

     //hide all timelines
     $('.tl-timeline').hide();

     //show only this timeline
     $('#timeline-'+thisIpes.toLowerCase()).show();

     //create timeline
     var options = {
       start_at_slide: 0
     };
     //window.timeline = new TL.Timeline('timeline-uff', timelines.UFF,options);

     //TODO: melhorar o jeito de identificar qual trecho do json pegar
     if (!$('#timeline-'+thisIpes.toLowerCase()).hasClass('tl-timeline') ) {
       $.each(timelines, function (index, value) {
         if (index === thisIpes) {
           window.timeline = new TL.Timeline('timeline-'+thisIpes.toLowerCase(), value,options);
         }
       });
     }

     if (thistab != 'tab-3') {
      $('#tab-3').removeClass('current');
     }
     //loading data from third tab - end
  };
  //end of sidebar_load



 //functions to tabs on side background
 $('ul.tabs li').click(function(){
   var tab_id = $(this).attr('data-tab');

   $('ul.tabs li').removeClass('current');
   $('.tab-content').removeClass('current');

   $(this).addClass('current');
   $("#"+tab_id).addClass('current');

   //this code resolve issue #31
   //this resolve the problem with first datatable loaded
   if ($('#tab-2').hasClass('current')) {
        $('#table_data_'+thisIpes.toLowerCase()).DataTable().responsive.recalc();
   }
 });

}); //main function
