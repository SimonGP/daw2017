<?php
	require_once('clase_guias.php');
    $datos = array();
	class envio{
		public $id="";
		public $nombre_guia="";
		public $experiencia="";
		public $imagen_guia="";
		
		function __construct($id, $nombre_guia, $experiencia, $imagen_guia){
			$this->id=$id;
			$this->nombre_guia=$nombre_guia;
			$this->experiencia=$experiencia;
			$this->imagen_guia=$imagen_guia;
			
		}			
	}
	
	
	$enlace = new guias();

if($resultado=$enlace->seleccionarTodosGuias()){
			while($fila=$resultado->fetch_assoc()){	
				$media=new envio($fila['ID'],$fila['NOMBRE'],$fila['EXPERIENCIA'],$fila['IMAGEN_GUIA']);
				array_push($datos, $media);
			}
		}

if($datos!=""){
		header('Content-Type: application/json');
		echo json_encode($datos);
	}
	else{
		echo 'No hay Datos';
	}
?>