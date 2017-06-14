<?php
	include ("clase_historial.php");
	include ("../../rutas/php/clase_reservas.php");
	$usuarios=array();
		
	$km = $_POST['km'];
	$ruta = $_POST['ruta'];
	$listado = $_POST['usuarios'];
	$fecha=$_POST['fecha'];
	
	$usuarios=$listaArray=explode("#",$listado);
	$enlace = new historial();
	for ($x=0;$x<count($usuarios);$x++){
		$enlace->nuevoHistorial($usuarios[$x],$ruta,$km);
	}
	$nuevo=new reservas();
	$nuevo->activar($ruta,$fecha);
	echo "listo";
	
?>