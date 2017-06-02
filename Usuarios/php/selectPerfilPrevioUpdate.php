<?php
session_start();
include "./clase_usuarios.php";

$id = "";
$nick = "";
$correo = "";
$perfil = "";
$dni = "";
$nombre = "";
$apellidos = "";
$telefono = "";
$fecna = "";

class ObjetoUpdate {
    public $id = "";
    public $nick = "";
    public $correo = "";
    public $perfil = "";
    public $dni = "";
    public $nombre = "";
    public $apellidos = "";
    public $telefono = "";
    public $fecna = "";


    function __construct($id,$nick,$correo,$perfil,$dni,$nombre,$apellidos,$telefono,$fecna) {
        $this->id = $id;       
        $this->nick = $nick;
        $this->correo = $correo;
        $this->perfil = $perfil;
        $this->dni = $dni;
        $this->nombre = $nombre;
        $this->apellidos = $apellidos;
        $this->telefono = $telefono;
        $this->fecna = $fecna;
    }


}

if($_SESSION['ID'] != "") {
    $enlace = new Usuarios();
    $resultado = $enlace->seleccionarUnUsuario($_SESSION['ID']);

    while($fila = $resultado->fetch_assoc()) {
        $id=$fila['ID'];        
        $nick = $fila['USUARIO'];
        $correo = $fila['CORREO'];
        $perfil = $fila['PERFIL'];
        $dni=$fila['DNI'];
        $nombre=$fila['NOMBRE'];
        $apellidos=$fila['APELLIDOS'];
        $telefono=$fila['TELEFONO'];
        $fecna=$fila['FECNA'];
    }
    $respuesta = new ObjetoUpdate($id,$nick,$correo,$perfil,$dni,$nombre,$apellidos,$telefono,$fecna);
    
    header('Content-type: application/json');
    echo(json_encode($respuesta));
}
?>