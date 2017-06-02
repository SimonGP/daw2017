<?php
	class guias{
		public $conexion="";
		
		function __construct(){
			$this->conexion=new mysqli('localhost','root','','proyectodaw');
			
			if($this->conexion->connect_error){
                die('Error de Conexion ('.$this->conexion->connect_errno.')'.$this->conexion->connect_error);
            }
		}
		
		function annadirGuia($nombre, $experiencia, $imagen){
			$mensaje="";
			$consulta="insert into guias (NOMBRE_GUIA, EXPERIENCIA, IMAGEN_GUIA values('".$nombre."','".$experiencia."','".$imagen."')";
			if($resultado=$this->conexion->query($consulta)){
				$mensaje="Registrado nuevo Guia";
			}else{
				$mensaje="No se ha podido registrar al Guia";
			}
			return $mensaje;
		}
		
		function editarGuia($id,$nombre, $experiencia, $imagen){
			$mensaje="";
			$consulta="update guias set NOMBRE_GUIA='".$nombre."' EXPERIENCIA='".$experiencia."' IMAGEN='".$imagen."' where ID=".$id;
			if($resultado=$this->conexion->query($consulta)){
				$mensaje="Editado Guia";
			}else{
				$mensaje="No se ha podido editar al Guia";
			}
			return $mensaje;
		}
		function borrarGuia($id){
			$mensaje="";
			$consulta="delete from guias where id=".$id;
			if($resultado=$this->conexion->query($consulta)){
				$mensaje="Borrado Guia";
			}else{
				$mensaje="No se ha podido borrar al Guia";
			}
			return $mensaje;
		}
		
		function seleccionarTodosGuias(){
			$consulta="select guias.ID, usuarios.usuario as NOMBRE, EXPERIENCIA, IMAGEN_GUIA from guiaS join usuarios on usuarios.id = guias.nombre_guia";
			if($resultado=$this->conexion->query($consulta)){
				return $resultado;
			}
		}
		
		function seleccionarGuia($id){
			$consulta="select * from guias where id=".$id;
			if($resultado=$this->conexion->query($consulta)){
				return $resultado;
			}
		}
		
		function desconectar(){
			$this->conexion->close();
			return "conexion cerrada";
		}
	}
?>