# coding: utf-8
# scrpit para pegar o json das ipes e gerar os insert's no mysql
import json
import sys
import codecs

json_file = open('ipes-all.json')
data = json.load(json_file)

ipes = data['features']

result = codecs.open("result.sql",'w','utf-8')

for thisIpes in ipes:
    sigla = thisIpes['properties']['Sigla']
    lat = thisIpes['geometry']['coordinates'][1]
    lng = thisIpes['geometry']['coordinates'][0]
    logradouro = thisIpes['properties']['Logradouro'] if thisIpes['properties']['Logradouro'] != 'null' else ''
    bairro = thisIpes['properties']['Bairro'] if thisIpes['properties']['Bairro'] != 'null' else ''
    cidade = thisIpes['properties']['Cidade'] if thisIpes['properties']['Cidade'] != 'null' else ''
    estado = thisIpes['properties']['Estado'] if thisIpes['properties']['Estado'] != 'null' else ''
    cep = thisIpes['properties']['CEP'] if thisIpes['properties']['CEP'] != 'null' else ''
    telefone = thisIpes['properties']['Telefone'] if thisIpes['properties']['Telefone'] != 'null' else ''
    url = thisIpes['properties']['URL'] if thisIpes['properties']['URL'] != 'null' else ''
    url2 = thisIpes['properties']['URL2'] if thisIpes['properties']['URL2'] != 'null' else ''


    result.write("insert into ipes (sigla, lat, lng, logradouro, bairro, cidade, estado, cep, telefone, url, url2) values ('"+sigla+"',"+ str(lat) +","+ str(lng) +",'"+ logradouro +"','"+ bairro +"','"+ cidade +"','"+ estado +"','"+ cep +"','"+ telefone +"','"+ url +"','"+ url2 +"');\n")

result.close
