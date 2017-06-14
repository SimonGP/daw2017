<?Php
	
	include ('clase_usuarios.php');	
	$usuario=$_POST['usuario'];
	$correo=$_POST['correo'];
	$dni=$_POST['dni'];
		
	$enlace = new usuarios();
	$resultado=$enlace->comprobarNick($usuario,$correo,$dni);
	echo $resultado;
	
	
?>