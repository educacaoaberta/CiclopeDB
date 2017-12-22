# Criar e configurar Banco de Dados

* Conectar-se ao mysql da sua máquina:
mysql -u root -p 

* Criar base do ciclope:

create database ciclope;

* Criar usuário

CREATE USER 'ciclope'@'localhost' IDENTIFIED BY 'senha';

* Garantir privilégio ao usuário

GRANT ALL PRIVILEGES ON ciclope.* TO 'ciclope'@'localhost';

# Criar e popular tabelas

cd db

mysql ciclo < createtables.sql -u ciclo -p
mysql ciclo < inserts-ipes.sql -u ciclo -p 
mysql ciclo < inserts-polos.sql -u ciclo -p
mysql ciclo < inserts-cursos.sql -u ciclo -p
mysql ciclo < inserts-oferta.sql -u ciclo -p


# Gerar arquivo de configuração

cd model
cp config.php.example config.php

Editar config.php, inserindo dados do banco de dados (nome da tabela, nome do
usuário e senha)


