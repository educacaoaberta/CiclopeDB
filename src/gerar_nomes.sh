#/bin/bash
## brew install zorba

if [ ! -f /usr/local/bin/zorba ]
then
    echo "Instalar o zorba (www.zorba.io). No Mac, instalar com o HomeBrew, usando a linha abaixo:"
    echo "brew install zorba"
else
    echo "Gerando um novo arquivo nomes.json"
    zorba --uri-path '../static/json/' ipes_polos_names.jq -o ../static/json/nomes.json
fi
