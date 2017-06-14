<?php
	include 'clase_hospedajes.php';
	$datos=[];
	class hospe{
		public $id="";
		public $nombre="";
		public $localidad="";
		public $direccion="";
		public $telefono="";
		public $email="";
		public $web="";
		
		function __construct($id, $nombre,$localidad,$direccion,$telefono,$email,$web){
			$this->id=$id;
			$this->nombre=$nombre;
			$this->localidad=$localidad;
			$this->direccion=$direccion;
			$this->telefono=$telefono;
			$this->email=$email;
			$this->web=$web;
		}
		
	}
	$id=$_POST['id'];
	
	
	//$id=19;
	$enlace = new hospedaje();
	$resultado=$enlace->unHospedaje($id);
	//echo $resultado;
	while($fila=$resultado->fetch_assoc()){
		$des=explode("#",$fila['DESCRIPCION']);
		$respuesta=new hospe($fila['ID'],$fila['NOMBRE'],$fila['LOCALIDAD'],$des[0],$des[1],$des[2],$fila['PAGINA_WEB']);
		array_push($datos, $respuesta);
	}
	header('Content-Type: application/json');
	echo json_encode($datos);
	
	
?>