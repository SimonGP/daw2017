<?php
	include 'clase_reservas.php';
	$id=$_POST['id'];	
	
	$enlace = new reservas();	
	$resultado=$enlace->borrarReserva($id);		
	echo $resultado;
	$enlace->desconectar();
	
	
?>