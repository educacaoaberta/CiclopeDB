jsoniq version "1.0";

import module namespace functions = "http://jsoniq.org/functions";
import module namespace file = "http://expath.org/ns/file";

let $ipes := functions:parse-json(file:read-text("../static/json/ipes.geojson"))
let $polos := functions:parse-json(file:read-text("../static/json/polos.geojson"))

let $query_ipes :=
  for $features in $ipes.features[]
  return { $features.properties.sigla }
let $query_polos :=
  for $features in  $polos.features[]
  return { $features.properties.nome_polo }

return { nomes: [$query_ipes, $query_polos]}
