<?php

include 'conexion.php';



if(isset($_POST["btningresar"])){
    if (empty($_POST["Usuario"]) and empty($_POST["Password"])) {
        $error = "Los campos estan vacios";
    } else {
        $email = $_POST["Usuario"];
        $password = $_POST["Password"];
        $sql = $conn ->query("select * from usuarios where email = '$email' and contraseña = '$password'");
        
        if ($datos=$sql->fetch_object()){
            header("location: ../index.html");
            exit; 
        } else {
            $error = "Usuario o contraseña incorrectos";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="/assets/css/Inicio-sesion.css">
</head>
<body>
    <div class="container">
        <div class="content"><a href="../index.html">
            <h1>Papeleria</h1></a>
        </div>

        <div class="login-form">
            <h2>Iniciar sesión</h2>
            <form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
                <label for="username">Usuario:</label>
                <input type="text" id="username" name="Usuario" placeholder="Ingrese su usuario">
                <label for="password">Contraseña:</label>
                <input type="password" id="password" name="Password" placeholder="Ingrese su contraseña">
                <button type="submit" name="btningresar">Iniciar sesión</button>
            </form>
            <?php if(isset($error)){ echo "<p style='color: red;'>$error</p>"; } ?>
        </div>
    </div>
</body>
</html>