<?php	
	include "clase_usuarios.php";
	$id=$_POST['id'];
	$perfil=$_POST['perfil'];

	
	$enlace=new usuarios();
	$resultado=$enlace->cambiarPerfil($id,$perfil);
	
	
      
	echo $resultado;