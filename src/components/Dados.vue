<template>
    <div>
        <h1>Dados</h1>
        <table id="allunits" class="display" cellspacing="0" width="100%">
            <thead>
            <tr>
                <th>Tipo</th>
                <th>Nome</th>
                <th>Cidade</th>
                <th>UF</th>
            </tr>
            </thead>
        </table>
    </div>
</template>

<script>
  export default {
    mounted () {
      $('#allunits').DataTable({
        "ajax": {
          "url": "/static/json/lista-unidades.geojson",
          "dataSrc": "features"
        },
        "language": {
          "url": "/static/json/datatables_pt-br.json"
        },
          "columns": [
          { "data": "properties.tipo" },
          { "data": "properties.nome" },
          { "data": "properties.cidade" },
          { "data": "properties.estado" }
        ]
      });
    }
  }

</script>
