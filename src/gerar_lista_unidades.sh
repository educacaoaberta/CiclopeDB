#/bin/bash
## brew install zorba

if [ ! -f /usr/local/bin/zorba ]
then
    echo "Instalar o zorba (www.zorba.io). No Mac, instalar com o HomeBrew, usando a linha abaixo:"
    echo "brew install zorba"
else
    echo "Gerando um novo arquivo lista-unidades.json"
    zorba --uri-path '../static/json/' lista_unidades.jq -o ../static/json/lista-unidades.json

    echo "Gerando um novo arquivo polosbystate.json"
    zorba --uri-path '../static/json/' polosbystate.jq -o ../static/json/polosbystate.json

    echo "Gerando um novo arquivo ipesbystate.json"
    zorba --uri-path '../static/json/' ipesbystate.jq -o ../static/json/ipesbystate.json

    echo "Gerando um novo arquivo nomes.json"
    zorba --uri-path '../static/json/' ipes_polos_names.jq -o ../static/json/nomes.json

fi
