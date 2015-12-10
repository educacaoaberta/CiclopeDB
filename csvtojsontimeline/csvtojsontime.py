# coding=utf-8
#Esse script tem 3 parâmetros:
#arg1 = Nome do arquivo que será convertido
#arg2 = Headline que será utilizado no json
#arg3 = Text que será utilizado no título
#Esse script serve para converter arquivos csv's gerados do modelo do timeline-js do googledocs (https://drive.google.com/previewtemplate?id=1pHBvXN7nmGkiG8uQSUB82eNlnL8xHu6kydzH_-eguHQ&mode=public), para um arquivo json que seja compatível com o timeline-js 3.0
#Nesta versão só se considera data de início e fim (sem hora, headline e texto, e media)

import csv
import json
import sys

dadosJson = { 'title' : {'text' : {'headline' : sys.argv[2], 'text' : sys.argv[3]} }, 'events' : [] }
events = {}
with open(sys.argv[1], 'rb') as csvfile:
    dadosCsv = csv.reader(csvfile, delimiter=',', quotechar='"')
    firstline = 1
    for linha in dadosCsv:
        if firstline :
            firstline = 0
            continue
        events = {}
        start_date = {}
        end_date = {}
        text = {}
        media = {}
        #pula primeira
        #verificar se tem data de início
        if ( (linha[0] !="") or (linha[1] !="") or (linha[2] !="") ) :
            if (linha[0] !=""):
                start_date['year'] = linha[0]
            if (linha[1] !=""):
                start_date['month'] = linha[1]
            if (linha[2] !=""):
                start_date['day'] = linha[2]
            events["start_date"] = start_date
        #verificar se tem data de fim
        if ( (linha[4] !="") or (linha[5] !="") or (linha[6] !="") ) :
            if (linha[4] !=""):
                end_date['year'] = linha[4]
            if (linha[5] !=""):
                end_date['month'] = linha[5]
            if (linha[6] !=""):
                end_date['day'] = linha[6]
            events["end_date"] = end_date
        #verificar se tem headline e texto
        if ( (linha[9] !="") or (linha[10] !="")) :
            if (linha[9] !=""):
                text['headline'] = linha[9]
            if (linha[10] !=""):
                text['text'] = linha[10]
            events["text"] = text
        #verificar se tem media
        if ( (linha[11] !="") or (linha[12] !="") or (linha[13] !="") ) :
            if (linha[11] !=""):
                media['url'] = linha[11]
            if (linha[12] !=""):
                media['credit'] = linha[12]
            if (linha[13] !=""):
                media['caption'] = linha[13]
            events["media"] = media
        #adiciona um evento
        dadosJson['events'].append(events)
    result = json.dumps(dadosJson)
    print result
