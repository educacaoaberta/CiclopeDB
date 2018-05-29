# Scripts

## updatedata.py

Script para atualização dos dados, à partir dos dados enviados pela CAPES. 

### Requisitos

* python3
* pandas
* numpy
* csv2geojson (https://github.com/mapbox/csv2geojson)

### Modo de uso

`python3 updatedata.py ipes.xlsx polos.xlsx polosipes.xlsx ipes.json
polos.json`


* Arquivos .xlsx: dados enviados pela CAPES
* Arquivos .json: dados já existentes


