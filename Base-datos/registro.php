<?php
include 'conexion.php';

// Procesar formulario de registro
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST["nombre"];
    $apellidos = $_POST["apellidos"];
    $email = $_POST["email"];
    $contraseña = $_POST["contraseña"];

    // Validar campos vacíos
    if (empty($nombre) || empty($apellidos) || empty($email) || empty($contraseña)) {
        echo "Error: Debe completar todos los campos.";
    } else {
        // Validar email
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo "Error: El email no es válido.";
        } else {
            // Validar contraseña
            if (!preg_match("/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/", $contraseña)) {
                echo "Error: La contraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.";
            } else {
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
                        header("Location: index.php");
                    } else {
                        echo "Error: " . $sql . "<br>" . $conn->error;
                    }
                }
            }
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
            <input type="password" id="contraseña" name="contraseña">
            <button type="button" id="show-password" onclick="showPassword()">Mostrar</button>
            <br><br>
            <input type="submit" value="Registrarse">
        </form>
    </div>

    <script>
        function showPassword() {
            var passwordInput = document.getElementById("contraseña");
            var showPasswordButton = document.getElementById("show-password");

            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                showPasswordButton.textContent = "Ocultar";
            } else {
                passwordInput.type = "password";
                showPasswordButton.textContent = "Mostrar";
            }
        }
    </script>
</body>
</html>