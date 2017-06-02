<?php
session_start();
include "clase_usuarios.php";


$password = $_REQUEST['password'];
if(!empty($password)){
	$password=md5($password);
}
$nombre = $_REQUEST['nombre'];
$apellidos = $_REQUEST['apellidos'];
$fecna = $_REQUEST['fecna'];
$telefono = $_REQUEST['telefono'];

$enlace = new Usuarios(); 




		$_SESSION['nombre']= $nombre;
		$_SESSION['apellidos']= $apellidos;
		$_SESSION['telefono']= $telefono;
		$_SESSION['fecna']= $fecna;

$visualizar = $enlace->modificarUsuario($_SESSION['ID'],$_SESSION['nick'],$_SESSION['Correo'],$_SESSION['dni'],$nombre,$apellidos,$fecna,$telefono,$password);



echo json_encode($visualizar);

?>