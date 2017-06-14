<?php

	class hospedaje{
		public $conexion="";
		
		//contructor y conexion a la base de datos.
		function __construct(){
			$this->conexion=new mysqli('localhost','root','','proyectodaw');
			
			if($this->conexion->connect_error){
                die('Error de Conexion ('.$this->conexion->connect_errno.')'.$this->conexion->connect_error);
            }
		}
		
		function insertarHospedaje($nombre, $localidad, $descripcion, $pagina){
			$mensaje="";
			$consulta='insert into hospedajes (NOMBRE, LOCALIDAD, DESCRIPCION, PAGINA_WEB) values ("'.$nombre.'", "'.$localidad.'", "'. $descripcion.'", "'.$pagina.'")';
			if($resultado=$this->conexion->query($consulta)){
				$mensaje="Nuevo hospedaje";
			}else{
				$mensaje="No se ha podido incluir el hospedaje";
			}
			return $mensaje;			
		}
		
		function mostrarHospedajeTodos(){
			$consulta="select hospedajes.ID, hospedajes.NOMBRE, hospedajes.DESCRIPCION, hospedajes.PAGINA_WEB, localidad.LOCALIDAD from hospedajes join localidad on localidad.ID_LOCALIDAD = hospedajes.LOCALIDAD";
			if($resultado=$this->conexion->query($consulta)){
				return $resultado;
			}
		}
		
		function mostrarHospedaje($pueblo){
			$consulta="select hospedajes.ID, hospedajes.NOMBRE, hospedajes.DESCRIPCION, hospedajes.PAGINA_WEB, localidad.LOCALIDAD from hospedajes join localidad on localidad.ID_LOCALIDAD = hospedajes.LOCALIDAD where localidad.LOCALIDAD='".$pueblo."'";
			if($resultado=$this->conexion->query($consulta)){
				return $resultado;
			}
		}
		
		function unHospedaje($id){
			$consulta=" select hospedajes.ID, hospedajes.NOMBRE, hospedajes.DESCRIPCION, hospedajes.PAGINA_WEB, localidad.LOCALIDAD from hospedajes join localidad on localidad.ID_LOCALIDAD = hospedajes.LOCALIDAD where hospedajes.ID=".$id;
			if($resultado=$this->conexion->query($consulta)){
				return $resultado;
			}
		}
		
		function borrarHospedaje($id){
			$consulta="delete from hospedajes where id=".$id;
			if($resultado=$this->conexion->query($consulta)){
				return "borrado con exito";
			}else{
				return "No se ha podido borrar";
			}
		}
		
		function editarHospedaje($id, $nombre, $localidad, $descripcion, $pagina){
			$mensaje="";			
			$consulta="update hospedajes set NOMBRE='".$nombre."', LOCALIDAD='".$localidad."', DESCRIPCION='".$descripcion."', PAGINA_WEB='".$pagina."' where ID=".$id;
			if($resultado=$this->conexion->query($consulta)){
				$mensaje="Editado hospedaje";
			}else{
				$mensaje="No se ha podidoeditar el hospedaje";
			}
			return $mensaje;			
		}
		
		function desconectar(){
			$this->conexion->close();
			return "conexion cerrada";
		}
		
	}
?>