#inserção dos dados no banco

insert into `ciclope`.`ipes` (`sigla`,`lat`,`lng`) values ('UFF',-22.90603,-43.13113),('UFMT',-15.608964,-56.065403);

insert into `ciclope`.`polos` (`cidade`, `estado`, `lng`,`lat`) values ('Angra dos Reis','Rio de Janeiro',-44.316326,-23.0063966),('Barra do Piraí','Rio de Janeiro',-43.8263236, -22.4703422),('Sapezal','Mato Grosso',-58.815552,-13.5498013);

insert into `ciclope`.`ipes_has_polos` (`ipes_id`,`polos_id`) values (1,1),(1,2),(2,3);
