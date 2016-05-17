//free icons from http://icon-park.com/icon/simple-location-map-pin-icon4-purple-free-vector-data/

var map;
var thisIpes;
var thisPolo;
var timelines;
$(function() {

  var brasil = L.geoJson(null, {
    style: {
      weight: 1,
      color: "#fff",
      opacity: 1,
      fillColor: "#ccc",
      fillOpacity: 1
      }
      });

  $.getJSON("geo/br_estados.json", function(data) { brasil.addData(data); }).then(function(data){
  //isso garante que só carrega o resto quando terminar de carregar o mapa


        //hide all timelines
        $('.timelines').hide();

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


        //estava aqui







        //Get data from php - begin
        $.getJSON("model/ipes.php?operation=allipes", function (data) {
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


        //pegando dados dos polos - begin
          $.getJSON("model/polos.php?operation=allpolos",function (data) {
              for (var i = 0; i < data.length; i++) {
                var nomepolo = data[i].nome_polo;
                var sigla = data[i].sigla;
                var idpolo = data[i].id;

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
                      "nomepolo":nomepolo,
                      "idpolo": idpolo
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

        //show de about table when load the map
        sidebar.show();
        $('#about-data').show();
        $('#tabs-data').hide();
        $("#about-data").load("content/sobre.html");

        function showPoloData (poloData) {
          $result = '<div class="pontoschave">';
          $result += '<div id="nome_ipes"class="title">'+poloData['nome_polo']+'</div>';
          $result += '</div><div id="dados_ipes">';
          $result += '<p><b>Endereço: </b>'+poloData['logradouro']+' '+poloData['numero']+'</p>';
          $result += '<p><b>Bairro: </b>'+poloData['bairro']+'</p>';
          $result += '<p><b>Cidade: </b>'+poloData['cidade']+'</p>';
          $result += '<p><b>Estado: </b>'+poloData['uf']+'</p>';
          $result += '<p><b>CEP: </b>'+poloData['cep']+'</p>';
          $result += '<p><b>Complemento: </b>'+poloData['complemento']+'</p>';
          $result += '<p><b>Nome Fantasia: </b>'+poloData['nome_fantasia']+'</p>';
          $result += '<p><b>Conceito: </b>'+poloData['conceito']+'</p>';


          $result += '<p><b>Número de cursos por IPES</b></p>';
          $result += '<div id="graphContainer">';
          $result += '<canvas id="myChart" width="400" height="400"></canvas>';
          $result += '<div id="legend"></div>';
          $result += '</div>';


          $result += '</div>';
          return $result;

        }
          //Função que associa o nome da cidade ao polo, e quando se clica abre o popup
        function onEachPolo (feature, layer) {
            layer.on ('click', function (f) {
              f.target.bindPopup(feature.properties.nomepolo).openPopup();


              //Só carrega novos dados se não for o mesmo polo
              if (thisPolo != feature.properties.nomepolo) {
                thisPolo = feature.properties.nomepolo;
                //carregar o sidebar para mostrar dados do polo
                $("#tab-1").empty();

                $.getJSON("model/polos.php?operation=polodata&id="+feature.properties.idpolo,function (data) {
                  $(showPoloData(data[0])).appendTo('#tab-1');

                  //This resolve issue #34, but always back to first tab
                  //Gambiarra!
                  if (!$('#tab-1').hasClass('current')){
                    $('#tab-2').removeClass('current');
                    $('#tab-title-datatables').removeClass('current');
                    $('#tab-1').addClass('current');
                    $('#tab-title-data').addClass('current');
                  }


                  //Gerando o gráfico
                  var ctx = document.getElementById("myChart").getContext("2d");
                  var myPieChart = new Chart(ctx).Pie([],{animation: false});
                  processChartPolo(myPieChart,feature.properties.idpolo);
                });
              }
              if($('#about-data').is(":visible") ){
                $('#about-data').hide();
                $('#tabs-data').show();
              }

              if (!sidebar.showed){
                sidebar.show();
              }

              //carrega os dados do datatable

              //exclui o datatable antigo
              $('#table_data_wrapper').remove();

              //insere a estrutura limpa para o novo --> talvez transformar em função
              var theadDefault = "<thead><tr>";

              $.getJSON("json/header_datatables.json", function(data) {
                dataHeader = data.header;
                for (var index = 0; index < dataHeader.length; index++){
                    theadDefault += "<th class=\"dt-left\">" + dataHeader[index] + "</th>"
                  };
                  theadDefault += "</tr></thead>";
                  $('<table id="table_data" class="responsive table_data" width="100%">'+ theadDefault).appendTo('#tab-2');
                });



              //load cursos data
              $.getJSON("model/cursos.php?operation=cursospolos&idpolo=" + feature.properties.idpolo ,function (data) {
                    $('#table_data').DataTable( {
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



              });
            //Does not work well with circles, but does with markers. Bug?
            // layer.on ('mouseout', function (a) {
            //   a.target.closePopup();
            // });
            }


        function showIpesData (ipesData){
          $result = '<div class="pontoschave">';
          $result += '<div id="nome_ipes"class="title">'+ipesData[0]['sigla']+'</div>';
          $result += '</div><div id="dados_ipes">';
          $result += '<p><b>Endereço: </b>'+ipesData[0]['logradouro']+'</p>';
          $result += '<p><b>Bairro: </b>'+ipesData[0]['bairro']+'</p>';
          $result += '<p><b>Cidade: </b>'+ipesData[0]['cidade']+'</p>';
          $result += '<p><b>Estado: </b>'+ipesData[0]['estado']+'</p>';
          $result += '<p><b>CEP: </b>'+ipesData[0]['cep']+'</p>';
          $result += '<p><b>Telefone: </b>'+ipesData[0]['telefone']+'</p>';
          $result += '<p><b>URL: </b>'+ipesData[0]['url']+'</p>';
          $result += '<p><b>URL2: </b>'+ipesData[0]['url2']+'</p>';

          //Gráfico Polos por Estado

          $result += '<p><b>Número de polos por estado</b></p>';
          $result += '<div id="graphContainer">';
          $result += '<canvas id="myChart" width="400" height="400"></canvas>';
          $result += '<div id="legend"></div>';
          $result += '</div>';


          $result += '</div>';
          return $result;
        }


        //each IPES pin clicked will call the related .html available in the json file (Arquivo)
        function onEachFeature (ipes, layer) {
          // layer.setIcon(ipesIcon);
          layer.on ('mouseover', function (f) {
            f.target.bindPopup(ipes.properties.Sigla).openPopup();
            });

          layer.on("click", function() {

            //verificando se a atual ipes tem timeline
            if ( $("#timeline-"+(ipes.properties.Sigla).toLowerCase()).length ) {
              $('#tab-title-timeline').show();
            } else{
              //Quando não tem dados, não tem timeline também, então esconde a timeline

              //Caso a tab selecionada atualmente seja a de timeline, muda para a primeira
              if ($('#tab-3').hasClass('current')) {
                  $('#tab-3').removeClass('current');
                  $('#tab-title-data').addClass('current');
                  $('#tab-1').addClass('current');
              }
              $('#tab-title-timeline').removeClass('current');
              $('#tab-title-timeline').hide();
            }

            //Se for o mesmo ipes que o anteriormente clicado, não precisa recarregar os dados
            if (thisIpes != ipes.properties.Sigla) {

              thisIpes = ipes.properties.Sigla;
              //se o arquivo com dados existir, exibe ele
              $("#tab-1").load('content/' + ipes.properties.Arquivo, function (response, status, xhr) {
                if (status == "error") {
                  //se não existir, utiliza os dados da base para exibir

                  //pegando dados da ipes atual
                  $.getJSON("model/ipes.php?operation=ipesdata&sigla="+thisIpes,function (data) {
                    $("#tab-1").empty();

                    //This resolve issue #34, but always back to first tab
                    //Gambiarra!
                    if (!$('#tab-1').hasClass('current')){
                      $('#tab-2').removeClass('current');
                      $('#tab-title-datatables').removeClass('current');
                      $('#tab-3').removeClass('current');
                      $('#tab-title-timeline').removeClass('current');
                      $('#tab-1').addClass('current');
                      $('#tab-title-data').addClass('current');
                    }

                    $(showIpesData(data)).appendTo("#tab-1");

                    //Gerando o gráfico
                    var ctx = document.getElementById("myChart").getContext("2d");
                    var myPieChart = new Chart(ctx).Pie([],{animation: false});

                    processChartIpes(myPieChart,thisIpes);
                  });


                }
              }


            );
            //Para resolver casos que não se tem dados no datatables
            $('#table_data_wrapper').remove();
          }

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

            //exclui o datatable antigo
            $('#table_data_wrapper').remove();

            //insere a estrutura limpa para o novo --> talvez transformar em função
            var theadDefault = "<thead><tr>";

            $.getJSON("json/header_datatables.json", function(data) {
              dataHeader = data.header;
              for (var index = 0; index < dataHeader.length; index++){
                  theadDefault += "<th class=\"dt-left\">" + dataHeader[index] + "</th>"
                };
                theadDefault += "</tr></thead>";
                $('<table id="table_data" class="responsive table_data" width="100%">'+ theadDefault).appendTo('#tab-2');
              });



            //load cursos data
            $.getJSON("model/cursos.php?operation=cursosipes&sigla=" + siglaAtual ,function (data) {
                  $('#table_data').DataTable( {
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
                $('#table_data').DataTable().responsive.recalc();
           }
         });

 }); //Finish load the map


}); //main function
