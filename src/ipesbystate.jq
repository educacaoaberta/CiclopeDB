jsoniq version "1.0";

import module namespace functions = "http://jsoniq.org/functions";
import module namespace file = "http://expath.org/ns/file";

let $ipes := functions:parse-json(file:read-text("../static/json/ipes.geojson"))


let $query_ipes :=
  for $features in  $polos.features[]
  let $estado := $features.properties.estado
  group by $estado
  order by count($features.properties.sigla)
  return { "quant" : count($features.properties.sigla),
           "estado" : $estado }

return { data: [$query_ipes] }
