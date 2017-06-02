<?php


class Usuarios{
        
	public $conexion="";       
	
	//contiene la conexión a la base de datos
	function __construct() {
		$this->conexion=new mysqli('localhost','root','','proyectodaw');
		
		if($this->conexion->connect_error){
			die('Error de Conexion ('.$this->conexion->connect_errno.')'.$this->conexion->connect_error);
		}
	}
	
	
	//Hace un insert a la base de datos para añadir usuarios
	function nuevoUsuario($usuario,$correo,$dni,$nombre,$apellidos,$fecna,$telefono,$perfil,$password) {
		
		$mensaje = "";
		
		$consulta = "insert into usuarios (USUARIO,CORREO,DNI,NOMBRE,APELLIDOS,FECNA,TELEFONO,PERFIL,PASSWORD) values ('$usuario','$correo','$dni','$nombre','$apellidos','$fecna',$telefono,'$perfil','$password')";
		
		if($resultado = $this->conexion->query($consulta)) {
			$mensaje = "True";
		}else {
			$mensaje = "False";
		}
		
		return $mensaje;
	}
    
    function comprobarLogueo($nick) {
        $consulta = "select ID, USUARIO,CORREO,DNI,NOMBRE,APELLIDOS,FECNA,TELEFONO,PASSWORD,perfilusuario.PERFIL as PERFIL from usuarios join perfilusuario on perfilusuario.IDPERFIL = usuarios.PERFIL where USUARIO='$nick'";
        $resul="";
        if($resultado=$this->conexion->query($consulta)) {
            while($fila=$resultado->fetch_assoc()){ 
                $idSelect=$fila['ID'];
                $nickSelect = $fila['USUARIO'];
                $passwordSelect = $fila['PASSWORD'];
                $correoSelect = $fila['CORREO'];
                $dniSelect = $fila['DNI'];
                $nombreSelect = $fila['NOMBRE'];
                $apellidosSelect = $fila['APELLIDOS'];
                $telefonoSelect = $fila['TELEFONO'];
                $fecnaSelect = $fila['FECNA'];
                
                $perfilSelect = $fila['PERFIL'];
                
                $resul=[$nickSelect,$passwordSelect,$correoSelect,$dniSelect,$nombreSelect,$apellidosSelect,$fecnaSelect,$telefonoSelect,$perfilSelect,$idSelect];
            } 

            return $resul;
        }else {
            return 0;
		}
		
	}

        
	//Hace un update a la base de datos para modificar parámetros de usuario
	function modificarUsuario($id,$usuario,$correo,$dni,$nombre,$apellidos,$fecna,$telefono,$password) {
		$mensaje= "";
		
		$consulta = "update usuarios set USUARIO='$usuario',CORREO='$correo',DNI='$dni',NOMBRE='$nombre',APELLIDOS='$apellidos',FECNA='$fecna',TELEFONO=$telefono,PASSWORD = '$password' WHERE ID='$id'";
        
        
		
		if($respuesta=$this->conexion->query($consulta)) {
			$mensaje = "Se ha modificado el usuario con ID ". $id;
		}else {
			$mensaje = "No se ha podido modificar el usuario";
		}
		
		return $mensaje;
	}
	
	function borrarUsuario($id) {
		$mensaje = "";
		$consulta = "delete from usuarios where ID=$id";
		
		if($respuesta = $this->conexion->query($consuta)) {
			$mensaje = "Se ha borrado el usuario con id " . $id;
		}else {
			$mensaje = "No se ha podido borrar el usuario";
		}
		
		return $mensaje;
	}
	
	function seleccionarTodosLosUsuarios() {
		$consulta = "select * from usuarios";
		if($resultado = $this->conexion->query($consulta)) {
			return $resultado;
		}
	}
	
	function seleccionarUnUsuario($id) {
		$consulta = "select * from usuarios where ID=$id";
		if($resultado=$this->conexion->query($consulta)) {
			return $resultado;
		}

	}
	
	function comprobarNick($nick){
		$consulta="select USUARIO from usuarios where USUARIO ='".$nick."'";
		if($resultado=$this->conexion->query($consulta)) {
			if($resultado->num_rows>0){
					return 1;
				}else{
					return 0;
				}
		}
	}
}

?>