jsoniq version "1.0";

import module namespace functions = "http://jsoniq.org/functions";
import module namespace file = "http://expath.org/ns/file";

let $ipes := functions:parse-json(file:read-text("../static/json/ipes.geojson"))
let $polos := functions:parse-json(file:read-text("../static/json/polos.geojson"))
let $ipespolos := functions:parse-json(file:read-text("../static/json/ipespolos.json"))

let $query_ipes :=
  for $features in $ipes.features[]
return {
  "ipe_id": $features.properties.id,
  "ipe_dados": {
    "tipo": $features.properties.tipo,
    "nome": $features.properties.sigla,
    "cidade": $features.properties.cidade,
    "estado": $features.properties.estado
  }
}

let $query_polos :=
  for $features in $polos.features[]
return {
  "polo_id": $features.properties.id,
  "polo_dados": {
    "tipo": $features.properties.tipo,
    "nome": $features.properties.nome_polo,
    "cidade": $features.properties.cidade,
    "estado": $features.properties.estado
  }
}

let $result :=
  for $ipepolo in $ipespolos[]
    let $ipe_id := $ipepolo.ipes_id
    let $polo_id := $ipepolo.polos_id
    let $ipe_dados := $query_ipes[ int($$.ipe_id) = int($ipe_id)].ipe_dados
    let $polo_dados := $query_polos[ int($$.polo_id) = int($polo_id)].polo_dados
    order by $ipe_dados.nome, $polo_dados.nome
    return
    {
      "sigla_ipes": $ipe_dados.nome,
      "estado_ipes": $ipe_dados.estado,
      "nome_polo": if ($polo_dados.nome != null) then $polo_dados.nome else "Polo não cadastrado (ID = " || $polo_id cast as string || ")",
      "estado_polo": if ($polo_dados.estado != null) then $polo_dados.estado else $ipe_dados.estado
    }

return {"data": $result}
