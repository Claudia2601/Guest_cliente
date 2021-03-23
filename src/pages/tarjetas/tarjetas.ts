import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AgregarTarjetaPage } from "../../pages/agregar-tarjeta/agregar-tarjeta";
import { UsuarioProvider } from "../../providers/usuario/usuario";

@IonicPage()
@Component({
  selector: 'page-tarjetas',
  templateUrl: 'tarjetas.html',
})
export class TarjetasPage {

  misTarjetas: any;
  uid: any;
  misTarjetasRegistradas: any;
  tarjetaAnterior: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public usuarioProv: UsuarioProvider){
          //sacar el id del usuario del local storage
          this.uid = localStorage.getItem('uid');
          this.tarjetaAnterior = localStorage.getItem('TarjetaId');
          console.log('tarjeta anterior',this.tarjetaAnterior);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TarjetasPage');
    this.getAllTarjetas();
  }

  //obtener todas las tarjetas del usuario
  getAllTarjetas() {
    //console.log('miuser',this.uid);
    this.usuarioProv.getTarjetasUser(this.uid).subscribe(tarjeta => {
      this.misTarjetas = tarjeta;
      this.tarjetaAnterior = localStorage.getItem('TarjetaId');
      console.log('misTarjetas',this.misTarjetas);
    });
  }

  //ir a la pantalla para registrar una tarjeta nueva
  agregarTarjeta(){
      this.navCtrl.setRoot(AgregarTarjetaPage);
  }

  //cambiar el estatus de la tarjeta a Eliminada
  eliminarTarjeta(idTarjeta){
  this.usuarioProv.updateTarjetaEliminar(idTarjeta).then((respuesta: any) => {
      console.log("Respuesta: ", respuesta);
      if (respuesta.success == true) {
        console.log("Success: ", respuesta.success);
      }
    });
  }

  //cambiar el estatus de la tarjeta a ACTIVA
  usarTarjeta(idTarjeta){
       localStorage.setItem("TarjetaId", idTarjeta);
       //cambiar el estatus a activa cuando el usuario decide usar la tarjeta
        this.usuarioProv.updateTarjetaActiva(idTarjeta,this.tarjetaAnterior).then((respuesta: any) => {
          console.log("Respuesta: ", respuesta);
          if (respuesta.success == true) {
             console.log("Success: ", respuesta.success);
          }
        });
       //console.log('tarjeta anterior',this.tarjetaAnterior.length);
       //console.log('tarjeta nueva',idTarjeta);

          //cambiar estatus de tarjeta que antes estaba activa por la nueva que va a seleccionar el usuario
        //  this.usuarioProv.updateTarjetaVolverInactiva(this.tarjetaAnterior).then((respuesta: any) => {
        //      console.log("Respuesta: ", respuesta);
          //     if (respuesta.success == true) {
        //        console.log("Success: ", respuesta.success);
          //    }
        //   });

    //obtener las tajetas de la base
    //this.usuarioProv.getTarjetasRegistradas(this.uid).subscribe(tarjeta2 => {
    //  this.misTarjetasRegistradas = tarjeta2;
    //  console.log('misTarjetasRegistradas',this.misTarjetasRegistradas);
    //  this.misTarjetasRegistradas.forEach(dataT => {
    //     //console.log('idTarjetarecibida',idTarjeta);
    //     //console.log('tarjeta dela base',dataT.idTarjeta);
    //     if(idTarjeta!=dataT.idTarjeta){
    //
    //     }
    //  });
    //});
  }

}
