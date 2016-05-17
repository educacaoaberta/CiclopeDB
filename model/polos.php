<?php
require 'config.php';
//Segunda versão, retorna todos os polos, ou número de polos por estado de uma determinada ipes

$operation = $_GET['operation'];


// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$conn->query("set names 'utf8'");

if ($operation == "allpolos") {
  #modificar para retornar o polo uma única vez (ao invés de uma vez pra cada relação com ipes)
  $sql = "select distinct(nome_polo), polos.id, sigla,polos.lat,polos.lng from ipes, polos, cursos, oferta where ipes.sigla=cursos.ipes_sigla and oferta.polos_id=polos.id and oferta.cursos_id=cursos.id order by sigla";
  $result = $conn->query($sql);
  $rows = array();

  if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc())
      $rows[]=$row;
  }
}
elseif ($operation == "polosbystate") {
  //polos por estado
  $sigla = $_GET['sigla'];

  #estou considerando qualquer polo que já teve curso de uma ipes
  $sql = "select uf, count(uf) as quant from (select distinct(polos.id), polos.uf from polos,cursos, oferta where cursos.ipes_sigla='". $sigla ."' and oferta.cursos_id=cursos.id and oferta.polos_id=polos.id order by uf) as bla group by uf";

  $result = $conn->query($sql);
  $rows = array();

  if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc())
      $rows[]=[$row['uf'],$row['quant']];
  }

}
elseif ($operation == "polodata") {
  $idpolo = $_GET['id'];

  $sql = "select * from polos where id = " . $idpolo;


  $result = $conn->query($sql);
  $rows = array();

  if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc())
      $rows[]=$row;
  }

}

print json_encode($rows);

mysqli_close($conn);
?>
