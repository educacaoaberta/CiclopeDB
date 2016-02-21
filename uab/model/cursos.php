<?php
//Retorna todos os cursos de um ipes específico

$sigla = $_GET['sigla'];


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

$sql = "select nome, tipo, chamada from cursos, ipes where ipes.sigla='". $sigla ."' and cursos.ipes_id=ipes.id";
$result = $conn->query($sql);
$rows = array();

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc())
    $rows[]=$row;
}

print json_encode($rows);

mysqli_close($conn);
?>
