import json
from collections import OrderedDict

import pandas as pd

IPESCSV = "ipes-insert.csv"
POLOSCSV = "polos-insert.csv"
IPESPOLOSCSV = "PolosIES_limp.csv"

IPESJSON = "ipes.json"
POLOSJSON = "polos.json"
IPESPOLOSJSON = "ipespolos.json"

# convert ipes
ipes_json = {"type" : "FeatureCollection",
             "features": []}

ipes = pd.read_csv(IPESCSV)
#ipes.columns.insert(0, "tipo")

for i in ipes.values:

        features = OrderedDict(zip(ipes.columns, i))
        features['geometry'] = {'lat' : features['lat'],
                                'lng' : features['lng']}
        del features['lat']
        del features['lng']
        features['tipo'] = 'ipes'
        ipes_json["features"].append({"type" : "Feature",
                                      "properties": features})


with open(IPESJSON, 'w') as outfile:
    outfile.write(json.dumps(ipes_json, indent=4))

# convert polos
polos_json = {"type" : "FeatureCollection",
             "features": []}

polos = pd.read_csv(POLOSCSV, encoding='utf-8')

for p in polos.values:
        features = OrderedDict(zip(polos.columns, p))
        features['geometry'] = {'lat' : features['lat'],
                                'lng' : features['lng']}
        del features['lat']
        del features['lng']
        features['tipo'] = 'polos'
        polos_json["features"].append({"type" : "Feature",
                                      "properties": features})

with open(POLOSJSON, 'w') as outfile:
    outfile.write(json.dumps(polos_json, indent=4))

#convert ipes polos
ipespolos = pd.read_csv(IPESPOLOSCSV)

ipespolos_json = ipespolos.to_json(orient="records")

with open(IPESPOLOSJSON, 'w') as outfile:
    outfile.write(ipespolos_json)

