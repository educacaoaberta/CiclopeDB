# Criar e configurar Banco de Dados

* Conectar-se ao mysql da sua máquina:
`
mysql -u root -p 
`
* Criar base do ciclope:
`
create database ciclope;
`
* Criar usuário
`
CREATE USER 'ciclope'@'localhost' IDENTIFIED BY 'senha';
`
* Garantir privilégio ao usuário
`
GRANT ALL PRIVILEGES ON ciclope.* TO 'ciclope'@'localhost';
`
# Criar e popular tabelas

`cd db`

`mysql ciclope < createtables.sql -u ciclope -p`

`mysql ciclope < inserts-ipes.sql -u ciclope -p `

`mysql ciclope < inserts-polos.sql -u ciclope -p`

`mysql ciclope < inserts-cursos.sql -u ciclope -p`

`mysql ciclope < inserts-oferta.sql -u ciclope -p`


# Gerar arquivo de configuração

`cd model`

`cp config.php.example config.php`

Editar config.php, inserindo dados do banco de dados (nome da tabela, nome do
usuário e senha)


