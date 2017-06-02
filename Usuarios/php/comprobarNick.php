<?Php
	
	include ('clase_usuarios.php');	
	$usuario=$_POST['usuario'];
		
	$enlace = new usuarios();
	$resultado=$enlace->comprobarNick($usuario);
	echo $resultado;
	
	
?>