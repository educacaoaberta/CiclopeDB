jsoniq version "1.0";

import module namespace functions = "http://jsoniq.org/functions";
import module namespace file = "http://expath.org/ns/file";

let $ipes := functions:parse-json(file:read-text("../static/json/ipes.geojson"))
let $polos := functions:parse-json(file:read-text("../static/json/polos.geojson"))

let $query_ipes :=
  for $features in $ipes.features[]
  return { "tipo" : $features.properties.tipo,
           "nome" : $features.properties.sigla,
           "cidade" : $features.properties.cidade,
           "estado" : $features.properties.estado
         }
let $query_polos :=
  for $features in  $polos.features[]
  return { "tipo" : $features.properties.tipo,
           "nome" : $features.properties.nome_polo,
           "cidade" : $features.properties.cidade,
           "estado" : $features.properties.estado
          }

return { listaunidades: [ $query_ipes, $query_polos] }
