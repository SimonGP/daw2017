<?php
	require_once("clase_reservas.php");
	$enlace=new reservas();	
	

	$datos=array();
	$resultado=$enlace->todasReservas();
	$datos=array();
	class reserva{
		public $id="";
		public $nombre="";
			
		
		function __construct($id, $nombre){
			$this->id=$id;
			$this->nombre=$nombre;				
		}
	}	
	
	while ($fila=$resultado->fetch_assoc()){	
		$juan = new reserva($fila['RUTAS'],$fila['FECHA']);
		array_push($datos, $juan);
	}		

	
	header('Content-type: application/json');
	echo json_encode($datos);


?>