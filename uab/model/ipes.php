<?php
require 'config.php';

$operation = $_GET['operation'];

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
$conn->query("set names 'utf8'");

if ($operation == "allipes") {
  $sql = "SELECT `sigla`, `lat`, `lng` FROM ipes";
  $result = $conn->query($sql);
  $rows = array();

  if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc())
      $rows[]=$row;
  }
}
elseif ($operation == "ipesdata") {
    $sigla = $_GET['sigla'];
    $sql = "SELECT sigla, logradouro, bairro, cidade, estado, cep, telefone, url, url2 FROM ipes WHERE sigla='". $sigla ."'";

    $result = $conn->query($sql);
    $rows = array();

    if ($result->num_rows > 0) {
      while($row = $result->fetch_assoc())
        $rows[]=$row;
    }

}
elseif ($operation == "ipesbystate") {
    $sql = "SELECT count(sigla) as quant, estado FROM ipes GROUP BY estado ORDER BY quant";

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
