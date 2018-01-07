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
    $sql = "select nome_polo, polos.id, sigla, polos.lat, polos.lng from ipes, polos, ipes_has_polos where ipes_has_polos.ipes_id=ipes.id and ipes_has_polos.polos_id=polos.id";
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
  $sql = "select uf, count(uf) as quant from (select polos.id, polos.uf from polos, ipes, ipes_has_polos where  ipes.sigla='". $sigla ."' and ipes_has_polos.ipes_id=ipes.id and polos.id=ipes_has_polos.polos_id order by uf) as bla group by uf";

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
