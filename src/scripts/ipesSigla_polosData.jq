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
    return { "ipe_id" : $feature.properties.id, "ipe_sigla" : $feature.properties.sigla }
};

declare function local:conta_polos_por_estado($polo_ids as array) {
  for $polo_id in $polo_ids[] , $polo in $polos.features[]
  where int($polo.properties.id) eq int($polo_id)
  group by $estado := $polo.properties.estado
  return { "estado" : $estado, "quantidade_polos" : count($polo.properties.estado) }
};

let $polo_ids_by_ipe_id :=
  for $ipe_id in $ipe_ids, $ipe_sigla in $ipe_siglas[$$.ipe_id eq $ipe_id]
    let $polo_ids :=
      for $ipepolo in $ipespolos[]
      where $ipepolo.ipes_id = int($ipe_id)
      return $ipepolo.polos_id
  return { $ipe_sigla.ipe_sigla : [local:conta_polos_por_estado( [$polo_ids] )] }
return { [$polo_ids_by_ipe_id] }

