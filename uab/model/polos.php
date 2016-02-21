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

$conn->query("set names 'utf8'");

$sql = "select sigla,cidade,estado,polos.lat,polos.lng from ipes, polos, cursos, polos_has_cursos where ipes.id=cursos.id and polos_has_cursos.polos_id=polos.id and polos_has_cursos.cursos_id=cursos.id order by sigla";
$result = $conn->query($sql);
$rows = array();

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc())
    $rows[]=$row;
}

print json_encode($rows);

mysqli_close($conn);
?>
