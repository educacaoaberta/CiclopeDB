# coding: utf-8
import json
import sys
import csv
from urllib2 import Request, urlopen, URLError


def consultLatLng(cep,apikey):
    latlng =[]
    request = Request('https://maps.googleapis.com/maps/api/geocode/json?address='+cep+'&key='+apikey)
    try:
        response = urlopen(request)
    #recebe o json como uma string
        result = response.read()
    #convertendo para lista
        data = json.loads(result)
        if data['results'] != [] :
            latlng.append( data['results'][0]['geometry']['location']['lat'])
            latlng.append(data['results'][0]['geometry']['location']['lng'])
    except URLError, e:
        print 'problems with result', e
    return latlng


#pegando a api key
apikey = sys.argv[1]

#arquivo original
fileorig = csv.reader(open('data.csv','rb'),delimiter=',')
fileresult = csv.writer(open('result.csv','wb'))

listorig = list(fileorig)

header = listorig.pop(0)

#inserindo lat e long
for polo in listorig:
    cep = polo[8]
    #faz consulta
    latlng=consultLatLng(cep,apikey)
    if latlng != [] :
        polo.append(latlng[0])
        polo.append(latlng[1])
    else :
        #se não encontrou a coordenada, preenche com vazio
        polo.append('')
        polo.append('')


fileresult.writerows(listorig)
