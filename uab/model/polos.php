<?php
//Segunda versão, retorna todos os polos, ou número de polos por estado de uma determinada ipes

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

if ($operation == "allpolos") {

  $sql = "select sigla,cidade,estado,polos.lat,polos.lng from ipes, polos, cursos, polos_has_cursos where ipes.id=cursos.id and polos_has_cursos.polos_id=polos.id and polos_has_cursos.cursos_id=cursos.id order by sigla";
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

  $sql = "select estado,count(estado) as quant from ipes, polos, cursos, polos_has_cursos where ipes.sigla='". $sigla ."' and ipes.id=cursos.id and polos_has_cursos.polos_id=polos.id and polos_has_cursos.cursos_id=cursos.id group by estado";

  $result = $conn->query($sql);
  $rows = array();

  if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc())
      $rows[]=[$row['estado'],$row['quant']];
  }

}

print json_encode($rows);

mysqli_close($conn);
?>
