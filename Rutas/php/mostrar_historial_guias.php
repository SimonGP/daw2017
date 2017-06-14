<?php
	require_once("clase_reservas.php");
	$enlace=new reservas();	
	

	$datos=array();
	$resultado=$enlace->cargarHistorial();
	$datos=array();
	class reserva{
		public $id="";
		public $nombre="";
			
		
		function __construct($id, $nombre){
			$this->id=$id;
			$this->nombre=$nombre;				
		}
	}	
	$contador = 1;
	while ($fila=$resultado->fetch_assoc() AND $contador<10){	
		$juan = new reserva($fila['RUTAS'],$fila['FECHA']);
		array_push($datos, $juan);
		$contador++;
	}		

	
	header('Content-type: application/json');
	echo json_encode($datos);


?>