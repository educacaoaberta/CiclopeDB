#!/usr/bin/env python3
"""
Esse script é utilizado para tratar os dados enviados pela CAPES de modo que
possam ser usados corretamente pelo ciclope
"""

# para polos e ipes:
#   remover repetidos  (por ID) ok
#   verificar se já existe ou é novo (só inserir se for novo) ok
#   verificar se existe lat/lng
#   se não existir fazer busca e adicionar anotação no endereço de que é
#   aproximado
# converter para geojson

# sintaxe:
# updatedata ipes.xlsx polos.xlsx polosipes.xlsx ipes.json polos.json
import sys
import subprocess
import json

import pandas as pd
import numpy as np

ENCODING="utf-8"

IPES="ipes.xlsx"
POLOS="polos.xlsx"
IPESPOLOS="ipes-polos.xlsx"

IPESOLD="ipes.json"

def getIds(items):
    """
    Retorna os ids de uma lista de dicionários que foi carregado de um geojson
    """
    ids = []
    for i in ipes_old['features']:
        ids.append(int(i['properties']['id']))
    return ids



# carregar xlsx (dados novos)
ipes = pd.read_excel(IPES)
#polos = pd.read_excel(POLOS)
#ipespolos = pd.read_excel(IPESPOLOS)

# renomear cabeçalhos
ipes = ipes.rename(index=str, columns={'ID':'id', 'SIGLA':'sigla', 'NOME':
                                         'nome', 'LOGRADOURO':'logradouro',
                                         'BAIRRO' : 'bairro',
                                         'COMPLEMENTO':'complemento',
                                         'CIDADE':'cidade', 'UF':'estado',
                                         'CEP':'cep', 'TELEFONE':'telefone',
                                       "URL":'url', "LATITUDE":'lat',
                                       "LONGITUDE":'lng'})

# adicionar campo tipo
ipes['tipo'] = 'ipes'

# carregar dados antigos
ipes_old = pd.read_json(IPESOLD)
#polos_old = pd.read_json()

# excluir duplicados
ipes = ipes.drop_duplicates(['id'])


## verificar quais dados são realmente novos (só incluir novos)
ipes_old_ids = getIds(ipes_old)
#new_ipes_ids = [i for i in ipes.id if i in ipes_ids]
#ipes = ipes.query('id not in ' + str(new_ipes_ids))

# verificar quais foram removidos (não existem mais)
#del_ipes_ids = [i for i in ipes_ids if i not in ipes.id.values]


# verificar os que não tem lat/long

ipes_wo_lat_lng = np.argwhere(np.isnan(ipes.lat.values))[0]
ipes_wo_lat_lng = np.unique(np.append(ipes_wo_lat_lng,
                                      np.argwhere(np.isnan(ipes.lng.values))[0]))

for i in ipes_wo_lat_lng:
    # se existe nos registros antigos, utilizar
    if ipes.id[i] in ipes_old_ids:
        ipes.lng[i] = ipes_old['features'][i]['geometry']['coordinates'][0]
        ipes.lat[i] = ipes_old['features'][i]['geometry']['coordinates'][1]

# converter para geojson
ipes.to_csv('/tmp/ipes.csv', index=False)
subprocess.run(['csv2geojson', '/tmp/ipes.csv'], stdout =
               open('/tmp/newipes.json','w'))



## merge antigo e novo
#ipes_new = pd.read_json('/tmp/newipes.json')
#ipes_updated = pd.concat([ipes_old, ipes_new], ignore_index=True)
#
# jeito improvisado de converter para o geojson correto
# as opções disponíveis no panda não retornam ele no formato correto
#ipes_new.to_json(IPESOLD + "new", orient='records')
#ipes_temp = json.load(open(IPESOLD + "new"))
#ipes_dict = dict()
#ipes_dict['features'] = []
#ipes_dict['type'] = 'FeatureCollection'
#
#for i in ipes_new:
#    ipes_dict['features'].append(i['features'])
#
#json.dump(ipes_dict, open(IPESOLD + "new",'w'))


