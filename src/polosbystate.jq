jsoniq version "1.0";

import module namespace functions = "http://jsoniq.org/functions";
import module namespace file = "http://expath.org/ns/file";

let $polos := functions:parse-json(file:read-text("../static/json/polos.geojson"))


let $query_polos :=
  for $features in  $polos.features[]
  let $estado := $features.properties.estado
  group by $estado
  order by count($features.properties.estado)
  return { "quant" : count($features.properties.estado),
           "estado" : $estado }

return { data: [$query_polos] }
