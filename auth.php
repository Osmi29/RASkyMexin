<?php
session_start();

// Información de conexión
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "flight_reservation";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Registro de usuario
if ($_POST['action'] == 'register') {
    $user = $_POST['username'];
    $pass = password_hash($_POST['password'], PASSWORD_BCRYPT);
    $email = $_POST['email'];
    $sql = "INSERT INTO Users (username, password, email) VALUES ('$user', '$pass', '$email')";

    if ($conn->query($sql) === TRUE) {
        echo "Registration successful";
        // Podrías redirigir a la página de inicio de sesión después del registro
        header("Location: login.html");
        exit();
    } else {
        echo "Error: " . $conn->error;
    }
}

// Inicio de sesión
if ($_POST['action'] == 'login') {
    $user = $_POST['username'];
    $pass = $_POST['password'];
    $sql = "SELECT password FROM Users WHERE username='$user'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if (password_verify($pass, $row['password'])) {
            // Iniciar la sesión
            $_SESSION['username'] = $user;
            echo "Login successful";
            // Redirigir al usuario al panel de control o a otra página
            header("Location: dashboard.php");
            exit();
        } else {
            echo "Invalid credentials";
        }
    } else {
        echo "No such user";
    }
}

// Cerrar sesión
if (isset($_GET['action']) && $_GET['action'] == 'logout') {
    // Destruir la sesión
    session_destroy();
    // Redirigir al login
    header("Location: login.html");
    exit();
}

$conn->close();
?>
