<?php
	require_once("clase_rutas.php");
	
	$id=$_POST['id'];
	$nombre=$_POST['nombre'];
	$km=$_POST['kilometros'];
	$minutos=$_POST['minutos'];
	$localidad=$_POST['localidad'];
	$consejos=$_POST['consejos'];
	$pdf=$_POST['dir_pdf'];
	$max_res=$_POST['maximo'];
	$valoracion=$_POST['valoracion'];
	$mapa=$_POST['mapa'];
	$dificultad=$_POST['dificultad'];
	
	
	/*$id=32;
	$nombre=1;
	$km=2;
	$minutos=3;
	$localidad=4;
	$consejos=6;
	$pdf=7;
	$max_res=8;
	$valoracion=9;
	$mapa=10;
	$dificultad=1*/;
	
	
	$enlace=new rutas();
	$resultado=$enlace->modificarRuta($id, $nombre,$km,$minutos,$localidad,$consejos,$dificultad,$valoracion,$pdf,$max_res,$mapa);
	echo $resultado;
	
?>