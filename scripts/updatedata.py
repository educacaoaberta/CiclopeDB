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
POLOSOLD="polos.json"


def getIds(items):
    """
    Retorna os ids de uma lista de dicionários que foi carregado de um geojson
    """
    ids = []
    for i in items['features']:
        ids.append(int(i['properties']['id']))
    return ids



# carregar xlsx (dados novos)
ipes = pd.read_excel(IPES)
polos = pd.read_excel(POLOS)
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

polos = polos.rename(index=str, columns={'ID':'id', 'SIGLA':'sigla', 'NOME_POLO':
                                       'nome_polo', 'NOME_FANTASIA' :
                                       'nome_fantasia', 'LOGRADOURO':
                                         'logradouro','NUMERO' : 'numero',
                                         'BAIRRO' : 'bairro',
                                         'COMPLEMENTO':'complemento',
                                         'CIDADE':'cidade', 'UF':'estado',
                                         'CEP':'cep', 'TELEFONE1':'telefone1',
                                         'TELEFONE2':'telefone2',
                                         'EMAIL1':'email1',
                                         'EMAIL2':'email2',
                                       "URL":'url', "LATITUDE":'lat',
                                       "LONGITUDE":'lng'})

# adicionar campo tipo
ipes['tipo'] = 'ipes'
polos['tipo'] = 'polos'

# carregar dados antigos
ipes_old = pd.read_json(IPESOLD)
polos_old = pd.read_json(POLOSOLD)

# excluir duplicados
ipes = ipes.drop_duplicates(['id'])
polos = polos.drop_duplicates(['id'])

# verificar os dados que não tem lat/long

## ipes
ipes_old_ids = getIds(ipes_old)
ipes_wo_lat_lng = np.argwhere(np.isnan(ipes.lat.values))[0]
ipes_wo_lat_lng = np.unique(np.append(ipes_wo_lat_lng,
                                      np.argwhere(np.isnan(ipes.lng.values))[0]))

for i in ipes_wo_lat_lng:
    # se existe nos registros antigos, utilizar
    if ipes.id[i] in ipes_old_ids:
        ipes.lng[i] = ipes_old['features'][i]['geometry']['coordinates'][0]
        ipes.lat[i] = ipes_old['features'][i]['geometry']['coordinates'][1]
    else:
        print('Ipes com id %d não tem dados de lat/long', polos.id[p])

## polos
polos_old_ids = getIds(polos_old)
polos_wo_lat_lng = np.argwhere(np.isnan(polos.lat.values))[0]
polos_wo_lat_lng = np.unique(np.append(polos_wo_lat_lng,
                                      np.argwhere(np.isnan(polos.lng.values))[0]))

for p in polos_wo_lat_lng:
    # se existe nos registros antigos, utilizar
    if polos.id[p] in polos_old_ids:
        polos.lng[p] = polos_old['features'][p]['geometry']['coordinates'][0]
        polos.lat[p] = polos_old['features'][p]['geometry']['coordinates'][1]
    else:
        print('Polo com id %d não tem dados de lat/long', polos.id[p])

# converter para geojson
ipes.to_csv('/tmp/ipes.csv', index=False)
subprocess.run(['csv2geojson', '/tmp/ipes.csv'], stdout =
               open('/tmp/newipes.json','w'))


polos.to_csv('/tmp/polos.csv', index=False)
subprocess.run(['csv2geojson', '/tmp/polos.csv'], stdout =
                open('/tmp/newpolos.json','w'))


