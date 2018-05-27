<?php
require 'config.php';

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if ( ! $conn) {
    die("Connection failed: ".mysqli_connect_error());
}
$conn->query("set names 'utf8'");

$sql_polos_ids       = "SELECT `id` FROM `polos`";
$result_polos_ids    = $conn->query($sql_polos_ids);
$map_poloId_ipesData = [];

if ($result_polos_ids->num_rows > 0) {
    while ($result_polo_id = $result_polos_ids->fetch_assoc()) {
        $polo_id          = $result_polo_id['id'];
        $sql_ipes_data    = "select estado, count(estado) as quant from (select ipes.id, ipes.estado from polos, ipes, ipes_has_polos where  polos.id='".$polo_id."' and ipes_has_polos.ipes_id=ipes.id and polos.id=ipes_has_polos.polos_id order by estado) as ipes_table group by estado;";
        $result_ipes_data = $conn->query($sql_ipes_data);
        $polo_data        = [];
        if ($result_ipes_data->num_rows > 0) {
            while ($res_dados = $result_ipes_data->fetch_assoc()) {
                $polo_data[$res_dados['estado']] = $res_dados['quant'];
            }
        }
        $map_poloId_ipesData[$polo_id] = $polo_data;
    }
}

$json = json_encode($map_poloId_ipesData);
print $json;
file_put_contents('../json/' . 'poloId_ipesData.json', $json);

mysqli_close($conn);
?>
