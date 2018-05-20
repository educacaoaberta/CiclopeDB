jsoniq version "1.0";

import module namespace functions = "http://jsoniq.org/functions";
import module namespace file = "http://expath.org/ns/file";

declare variable $ipes := functions:parse-json(file:read-text("../static/json/ipes.geojson"));
declare variable $polos := functions:parse-json(file:read-text("../static/json/polos.geojson"));
declare variable $ipespolos := functions:parse-json(file:read-text("../static/json/ipespolos.json"));

declare variable $polo_ids := {
  for $feature in $polos.features[]
    return $feature.properties.id
};

declare variable $ipe_ids := {
  for $feature in $ipes.features[]
    return $feature.properties.id
};

declare variable $ipe_siglas := {
  for $feature in $ipes.features[]
    return $feature.properties.sigla
};

declare function local:conta_ipes_por_estado($ipe_ids as array) {
  for $ipe_id in $ipe_ids[] , $ipe in $ipes.features[]
  where int($ipe.properties.id) eq int($ipe_id)
  group by $estado := $ipe.properties.estado
  return { "estado" : $estado, "quantidade_ipes" : count($ipe.properties.estado) }
};

let $polo_ids_by_ipe_id :=
  for $polo_id in $polo_ids
    let $ipe_ids :=
      for $ipepolo in $ipespolos[]
      where $ipepolo.polos_id = int($polo_id)
      return $ipepolo.ipes_id
  return { $polo_id : [local:conta_ipes_por_estado( [$ipe_ids] )] }
return { [$polo_ids_by_ipe_id] }
