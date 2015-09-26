# Arquivos JSON

Nesta pasta se encontram os arquivos de dados, atualmente eles estão organizados da seguinte maneira:

datatables_pt-br.json => Arquivo usado pelo datatables para exibição dos dados (considerar modifica-lo de pasta, e transformar a pasta json, e pasta data)

ipes.json => Indica os polos, e os arqiuvos .html com informações sobre o polo em questão
Formato:

{
   "type":"FeatureCollection",
   "features":[
      {
         "type":"Feature",
         "properties":{
           "Nome" : "Universidade Federal Fluminense",
           "Sigla" : "UFF",
           "Arquivo" : "uff.html"
         },
         "geometry":{
            "type":"Point",
            "coordinates":[
            -43.13113,
            -22.90603
            ]
         }
      },


polos.json => Arquivo similiar com o anterior, porém não contém informação do arquivo, verificar a possibilidade de eliminar um dos 2

cursos_* => Cada um desses arquivos contém os dados dos cursos oferecidos por uma ipes. Esses dados são utilizados pelo datatables.
Tentar juntar todos esses dados em um único .json
Formato: (Nome, Tipo, Chamada, Carga Horária, Períodos)

{
  "data": [
  [
    "Administração publica",
    "Bacharelado",
    "PNAP I",
    2775,
    8
  ],



linha_*.json => Cada um destes contém os dados temporais de uma IPES, que será usado para fazer a timeline
Tentar juntar todos esses arquivos em um único


uf*.json => Cada um destes arquivos contém todos os pólos associados à uma ipes.
O ideal seriam todos estarem juntos em um único arquivo, ou até no mesmo arquivo de ipes/polos
Formato:

{
   "type":"FeatureCollection",
   "features":[
      {
         "type":"Feature",
         "geometry":{
            "type":"Point",
            "coordinates":[
               -37.767894,
               -4.558259
            ]
         },
         "properties":{
            "ipes":"UFC",
            "cidade":"Aracati",
            "estado":"Ceará"
         }
      },
