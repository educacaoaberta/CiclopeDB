#/bin/bash
## brew install zorba

if [ ! -f /usr/local/bin/zorba ]
then
    echo "Instalar o zorba (www.zorba.io). No Mac, instalar com o HomeBrew, usando a linha abaixo:"
    echo "brew install zorba"
else
    echo "Gerando um novo arquivo lista-unidades.json"
    zorba --uri-path '../static/json/' scripts/lista_unidades.jq -o ../static/json/lista-unidades.json

    echo "Gerando um novo arquivo polosbystate.json"
    zorba --uri-path '../static/json/' scripts/polosbystate.jq -o ../static/json/polosbystate.json

    echo "Gerando um novo arquivo ipesbystate.json"
    zorba --uri-path '../static/json/' scripts/ipesbystate.jq -o ../static/json/ipesbystate.json

    echo "Gerando um novo arquivo nomes.json"
    zorba --uri-path '../static/json/' scripts/ipes_polos_names.jq -o ../static/json/nomes.json

    echo "Gerando um novo arquivo ipesdatatable.json"
    zorba --uri-path '../static/json/' scripts/ipesdatatable.jq -o ../static/json/ipesdatatable.json

     echo "Gerando um novo arquivo ipesSigla_polosData.json"
     zorba --uri-path '../static/json/' scripts/ipesSigla_polosData.jq -o ../static/json/ipesSigla_polosData.json

    echo "Gerando um novo arquivo poloId_ipesData.json"
    zorba --uri-path '../static/json/' scripts/poloId_ipesData.jq -o ../static/json/poloId_ipesData.json
fi
