<?php

$operation = $_GET['operation'];


$servername = "localhost";
$username = "ciclope";
$password = "ciclope";
$dbname = "ciclope";


// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
$conn->query("set names 'utf8'");


//Retorna todos os cursos de um ipes específico

if ($operation == "cursosipes") {
  $sigla = $_GET['sigla'];

  $sql = "select nome, tipo from cursos where cursos.ipes_sigla='". $sigla ."'";
  $result = $conn->query($sql);
  $rows = array();

  if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc())
    //esse é o formato para o datatable
      $rows[]=[$row['nome'],$row['tipo'],null,null,null];
  }

} elseif($operation == "cursospolos"){
  $idpolo = $_GET['idpolo'];

  $sql = "select distinct(cursos.id), nome, tipo from cursos, oferta, polos where oferta.polos_id=".$idpolo." and cursos.id=oferta.cursos_id";
  $result = $conn->query($sql);
  $rows = array();

  if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc())
    //esse é o formato para o datatable
      $rows[]=[$row['nome'],$row['tipo'],null,null,null];
  }


}
print json_encode($rows);

mysqli_close($conn);
?>
