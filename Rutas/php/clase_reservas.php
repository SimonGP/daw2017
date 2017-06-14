<?php
	class reservas{
		public $conexion="";
		
		//contructor y conexion a la base de datos.
		function __construct(){
			$this->conexion=new mysqli('localhost','root','','proyectodaw');
			
			if($this->conexion->connect_error){
                die('Error de Conexion ('.$this->conexion->connect_errno.')'.$this->conexion->connect_error);
            }
		}
		//pagina web
		function nuevaReserva($id_ruta,$id_usuario,$num_personas,$fecha, $personas){
			$mensaje="";
			$consulta="insert into reservas (ID_RUTA, ID_USUARIO, NUM_PERSONAS, FECHA, PERSONAS, REALIZADA) VALUES (".$id_ruta.",".$id_usuario.",".$num_personas.",'".$fecha."', '".$personas."',0)";
			if($resultado=$this->conexion->query($consulta)){
				$mensaje="Reserva realizada";
			}else{
				$mensaje="No se ha podido realizar la reserva, intentalo de nuevo";
			}
			return $mensaje;
		}
		//pagina web
		function borrarReserva($id){
			$mensaje="";
			$consulta="delete from reservas where id=".$id;
			if($resultado=$this->conexion->query($consulta)){
				$mensaje="Reserva borrada con exito";
			}else{
				$mensaje="No se ha podido borrar la reserva, intentalo de nuevo";
			}
			return $mensaje;
		}
		//pagina web
		function editarReserva($id,$num_personas){
			$mensaje="";
			$consulta="update reservas set NUM_PERSONAS=".$num_personas." where id=".$id;
			if($resultado=$this->conexion->query($consulta)){
				$mensaje="Reserva modificada";
			}else{
				$mensaje="No se ha podido modificar la reserva, intentalo de nuevo";
			}
			return $mensaje;
		}
		//pagina web
		function seleccionarTodasReservas($idUsuario){
			$consulta="select reservas.ID AS ID,rutas.NOMBRE AS RUTAS,FECHA,PERSONAS from reservas join rutas ON rutas.ID = RESERVAS.ID_RUTA  WHERE ID_USUARIO = $idUsuario and fecha>= CURDATE() order by RESERVAS.fecha asc";
			if($resultado=$this->conexion->query($consulta)){
				return $resultado;
			}
		}
		//pagina web
		function seleccionarReserva($id){
			$consulta="select * from reservas where id=".$id;
			if($resultado=$this->conexion->query($consulta)){
				return resultado;
			}
		}
		
		function desconectar(){
			$this->conexion->close();
			return "conexion cerrada";
		}
		
		function busquedaReserva($id, $fecha, $ruta){
			$consulta="select id_ruta, fecha, id_usuario from reservas where id_ruta=".$ruta." and id_usuario=".$id." and fecha='".$fecha."'";
			if($resultado = $this-> conexion -> query($consulta)){
				if($resultado->num_rows>0){
					return 1;
				}else{
					return 0;
				}
				
			}
		}
		
		function cargarHistorial(){
			$consulta="select rutas.NOMBRE as RUTAS, reservas.FECHA from reservas join rutas on rutas.id = reservas.id_ruta where reservas.fecha < CURRENT_DATE";
			if($resultado=$this->conexion->query($consulta)){
				return $resultado;
			}
		}
		
		function mostrarHistorial(){
			$consulta="select reservas.ID AS ID,rutas.NOMBRE AS RUTAS,FECHA,PERSONAS from reservas join rutas ON rutas.ID = RESERVAS.ID_RUTA  where RESERVAS.fecha>= CURDATE() group by rutas.NOMBRE  order by RESERVAS.fecha asc";
			if($resultado=$this->conexion->query($consulta)){
				return $resultado;
			}
		}
		
		function todasReservas(){
			
			$consulta="select reservas.ID AS ID,rutas.NOMBRE AS RUTAS,FECHA,PERSONAS from reservas join rutas ON rutas.ID = RESERVAS.ID_RUTA  where RESERVAS.fecha>= CURDATE() group by rutas.NOMBRE  order by RESERVAS.fecha asc";
			if($resultado=$this->conexion->query($consulta)){
				return $resultado;
			}
		
		}
		
		function TodasReservasImprimir($ruta, $fecha){
			
			$consulta="select reservas.ID AS ID,rutas.NOMBRE AS RUTAS,FECHA,PERSONAS from reservas join rutas ON rutas.ID = RESERVAS.ID_RUTA where Rutas.nombre='$ruta' and fecha='$fecha' order by RESERVAS.fecha asc";
			if($resultado=$this->conexion->query($consulta)){
				return $resultado;
			}
		
		}
		
		function pasarAHistorial($ruta, $fecha){
			
			$consulta="select reservas.ID AS ID,rutas.id AS RUTAS, rutas.KILOMETROS AS KM, FECHA,PERSONAS, ID_USUARIO as ID from reservas join rutas ON rutas.ID = RESERVAS.ID_RUTA where Rutas.nombre='$ruta' and fecha='$fecha' order by RESERVAS.fecha asc";
			if($resultado=$this->conexion->query($consulta)){
				return $resultado;
			}
		
		}
		
		function activar($ruta, $fecha){
			$consulta="update reservas REALIZADA = 1 where id_ruta=$ruta and fecha = $fecha";
			if($resultado=$this->conexion->query($consulta)){
				return $resultado;
			}
		
		}
	}
	
?>