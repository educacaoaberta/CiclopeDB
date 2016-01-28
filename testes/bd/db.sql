-- db: ciclope user: ciclope pass: ciclope
create table ipes (
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  sigla VARCHAR(10) NOT NULL,
  nome VARCHAR(100) NOT NULL,
  uab VARCHAR(100) NOT NULL,
  arquivo VARCHAR(30) NOT NULL,
  lat DECIMAL(11,8) NOT NULL,
  log DECIMAL(11,8) NOT NULL
);

insert into ipes (sigla, nome, uab, arquivo, lat, log) values ("UFF","Universidade Federal Fluminense", "CEAD – Coordenação de Educação a Distância", "uff.html", -43.13113, -22.90603);
