<?php
//operation could be: 'cursosipes' or 'cursospolos'



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

  $sql = "select nome, tipo, nome_polo, data_oferta, numero_vagas, qt_alunos_formados, qt_alunos_nao_concluinte + qt_alunos_desvincluado as nao_concluinte from cursos,oferta,polos where cursos.ipes_sigla='". $sigla ."' and oferta.cursos_id=cursos.id and polos.id = oferta.polos_id";
  $result = $conn->query($sql);
  $rows = array();

  if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc())
    //esse é o formato para o datatable
      $rows[]=[$row['nome'], $row['tipo'], $row['nome_polo'], $row['data_oferta'], $row['numero_vagas'], $row['qt_alunos_formados'], $row['nao_concluinte'] ];
  }

} elseif($operation == "cursospolos"){
  $idpolo = $_GET['idpolo'];

  $sql = "select nome, tipo, ipes_sigla, data_oferta, numero_vagas, qt_alunos_formados, qt_alunos_desvincluado as nao_concluinte from cursos, oferta where oferta.polos_id=".$idpolo." and cursos.id=oferta.cursos_id";
  $result = $conn->query($sql);
  $rows = array();

  if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc())
    //esse é o formato para o datatable
      $rows[]=[$row['nome'], $row['tipo'], $row['ipes_sigla'], $row['data_oferta'], $row['numero_vagas'], $row['qt_alunos_formados'], $row['nao_concluinte'] ];
  }


}
print json_encode($rows);

mysqli_close($conn);
