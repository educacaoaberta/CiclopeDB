<?php
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
echo "Connected successfully";

$sql = "SELECT sigla, nome, uab, arquivo, lat, log FROM ipes";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    echo $result->fetch_assoc();
    // while($row = $result->fetch_assoc()) {
    //     echo "id: " . $row["id"]. " - Name: " . $row["firstname"]. " " . $row["lastname"]. "<br>";
    // }
} else {
    echo "no results";
}

mysqli_close($conn);
?>
