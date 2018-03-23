<?php
require 'config.php';

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if ( ! $conn) {
    die("Connection failed: ".mysqli_connect_error());
}
$conn->query("set names 'utf8'");

$sql_ipes_sigla      = "SELECT `sigla` FROM `ipes`";
$result_ipes_siglas  = $conn->query($sql_ipes_sigla);
$map_poloId_ipesData = [];

if ($result_ipes_siglas->num_rows > 0) {
    while ($result_ipes_sigla = $result_ipes_siglas->fetch_assoc()) {
        $ipes_sigla       = $result_ipes_sigla['sigla'];
        $sql_ipes_data    = "select uf as estado, count(uf) as quant from (select polos.id, polos.uf from polos, ipes, ipes_has_polos where  ipes.sigla='".$ipes_sigla."' and ipes_has_polos.ipes_id=ipes.id and polos.id=ipes_has_polos.polos_id order by uf) as polos_table group by uf;";
        $result_ipes_data = $conn->query($sql_ipes_data);
        $ipes_data        = [];
        if ($result_ipes_data->num_rows > 0) {
            while ($res_dados = $result_ipes_data->fetch_assoc()) {
                $ipes_data[$res_dados['estado']] = $res_dados['quant'];
            }
        }
        $map_poloId_ipesData[$ipes_sigla] = $ipes_data;
    }
}

$json = json_encode($map_poloId_ipesData);
print $json;
file_put_contents('../json/' . 'ipesSigla_polosData.json', $json);

mysqli_close($conn);
?>
