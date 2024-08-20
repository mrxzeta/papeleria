<?php
$servername = "3306";
$username = "4514991_papeleria";
$password = "WH2Vjn2c3Rw4U-Ib";
$dbname = "4514991_papeleria";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("La conexión falló: " . $conn->connect_error);
}

?>