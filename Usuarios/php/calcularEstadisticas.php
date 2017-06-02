<?php
	session_start();
	include "clase_historial.php";

	class datos{
		public $kms = 0;
		public $rutas = 0;
		
		function __construct($km, $rutas){
			$this->kms=$km;
			$this->rutas=$rutas;
		}
	}
	$enlace = new Historial();	
	$resultado = $enlace->calcularNumRutas($_SESSION['ID']);
	 while($fila = $resultado->fetch_assoc()) {
		$rutas=$fila['TOTAL'];
	 }
	 
	$resultado2 = $enlace->sumarKm($_SESSION['ID']);
	
	while($fila = $resultado2->fetch_assoc()) {
		$km=$fila['TOTAL'];
	 }
	
	$respuesta = new datos($km, $rutas);


	header('Content-type: application/json');
	echo json_encode($respuesta);

?>