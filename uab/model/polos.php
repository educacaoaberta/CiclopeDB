<?php
//Primeira versão, o resultado da consulta são todos os polos, ordenados pelo respectivo IPES

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
$sql = "select sigla,cidade,estado,polos.lat,polos.lng from ipes, polos, ipes_has_polos where ipes_has_polos.ipes_id=ipes.id and ipes_has_polos.polos_id=polos.id order by sigla;";
$result = $conn->query($sql);
$rows = array();

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc())
    $rows[]=$row;
}

print json_encode($rows);

mysqli_close($conn);
?>
