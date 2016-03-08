# coding: utf-8
from urllib2 import Request, urlopen, URLError
import json
import sys

#api key do google
apikey = sys.argv[1]
adress = sys.argv[2]

request = Request('https://maps.googleapis.com/maps/api/geocode/json?address='+adress+'&key='+apikey)

try:
    response = urlopen(request)
#recebe o json como uma string
    result = response.read()
#convertendo para lista
    data = json.loads(result)
    if data['results'] != [] :
        print data['results'][0]['geometry']['location']['lat']
        print data['results'][0]['geometry']['location']['lng']
    else :
        print "No result"
    #latitude e longitude estão em: data['results'][0]['geometry']['location']['lng'] e data['results'][0]['geometry']['location']['lng']
except URLError, e:
    print 'problems with result', e
