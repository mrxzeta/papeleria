<?php
include 'conexion.php';

// Procesar formulario de registro
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST["nombre"];
    $apellidos = $_POST["apellidos"];
    $email = $_POST["email"];
    $contraseña = $_POST["contraseña"];

    // Verificar si el email ya existe en la base de datos
    $sql = "SELECT * FROM usuarios WHERE email = '$email'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        echo "Error: El email ya existe en la base de datos.";
    } else {
        // Insertar datos en la base de datos
        $sql = "INSERT INTO usuarios (nombre, apellidos, email, contraseña) VALUES ('$nombre', '$apellidos', '$email', '$contraseña')";
        if ($conn->query($sql) === TRUE) {
            echo "Registro exitoso!";
            header("Location: login.php");
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }
}

// Cerrar conexión
$conn->close();
?>

<!DOCTYPE html>
<html>
<head>
    <title>Registro de usuarios</title>
    <link rel="stylesheet" type="text/css" href="/assets/css/registro.css">
</head>
<body>
    <div class="container">
        <h2 class="titulo">Registro de usuarios</h2>
        <form class="formulario" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre"><br><br>
            <label for="apellidos">Apellidos:</label>
            <input type="text" id="apellidos" name="apellidos"><br><br>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email"><br><br>
            <label for="contraseña">Contraseña:</label>
            <input type="password" id="contraseña" name="contraseña"><br><br>
            <input type="submit" value="Registrarse">
        </form>
    </div>
</body>
</html>