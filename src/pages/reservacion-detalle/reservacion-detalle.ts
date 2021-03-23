import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MisReservacionesPage } from "../../pages/mis-reservaciones/mis-reservaciones";
import { GenerarqrPage } from "../../pages/generarqr/generarqr";
import { Generarqr_2Page } from "../../pages/generarqr-2/generarqr-2";
//importa provider donde se hacen las consultas
import { ReservacionProvider } from '../../providers/reservacion/reservacion';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
//import { Platform } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-reservacion-detalle',
  templateUrl: 'reservacion-detalle.html',
})
export class ReservacionDetallePage {
    listaProductos: any;
    idReservacion: any;
    mostrar: any;
    total: any;
    total2: any;
    productos: any;
    infoReservaciones: any;
    nombresAreas: any;
    nombresZonas: any;
    listado: any;
    aleatorio : any;
    seleccion : any;
    idResrvacion: any;
    idUsuario: any;
    cuentasCompartidas: any;
    infoUsers: any;
    allContacts: any;
    compartidasAceptadas: any;
    tamano: any;
    resultadoCompartir: any;
    idUser: any;
    infoEspera: any;
    resultadoEspera: any;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public reservaProvider: ReservacionProvider,
              public afDB: AngularFireDatabase,
              public afs: AngularFirestore
              ) {
    //recibe parametro de la reservacion
    this.idReservacion = this.navParams.get("idReservacion");
    //sacar el id del usuario guardado en el local storage
    this.idUser = localStorage.getItem('uid');

    //consultar tabla areas
    this.afs
      .collection("areas")
      .valueChanges()
      .subscribe(data => {
        this.nombresAreas = data;
      });

      //consultar tabla zonas
      this.afs
        .collection("zonas")
        .valueChanges()
        .subscribe(data1 => {
          this.nombresZonas = data1;
        });
        //consultar tabla users
        this.afs
          .collection("users")
          .valueChanges()
          .subscribe(data2 => {
            this.infoUsers = data2;
          });
        //consultar tabla compartidas
        this.afs
          .collection("compartidas")
          .valueChanges()
          .subscribe(data3 => {
            this.cuentasCompartidas = data3;
          });
  }



  ionViewDidLoad() {
    //carga funcion cuando abre la pagina
    this.getDetails();
    console.log("ionViewDidLoad EventoDetallePage");
    this.mostrar = true;
    this.personaAcepta();
    }

  getDetails() {
    // funcion para sacar lista de productos de una reservacion
    this.reservaProvider.getReservacionesProducto(this.idReservacion).subscribe(r => {
      this.listaProductos = r;
    });
    // total de general dependiendo los productos que tenga la reservacion
    this.reservaProvider.getProductos(this.idReservacion).subscribe(productos => {
      this.productos = productos;
      this.total = this.productos.reduce((acc, obj) => acc + obj.total, 0);
    });
    //informacion de la reservacion seleccionada
    this.reservaProvider.getInfo(this.idReservacion).subscribe(info => {
      this.infoReservaciones = info;
      this.idUser = localStorage.getItem('uid');
    });
    //consultar si exiente usuarios es espera de aceptar compartir la reservacion
    this.reservaProvider.consultarEspera(this.idReservacion).subscribe(infoE => {
      this.infoEspera = infoE;
      console.log('Info espera',this.infoEspera.length);
      if(this.infoEspera.length==0){
         this.resultadoEspera='true';
      }
      else{
        this.resultadoEspera='false';
      }
    });
  }


  personaAcepta() {
    //Consulta para revisar las personas que han aceptado compartir la reservacion
    this.reservaProvider.getCompartidaAceptada(this.idReservacion).subscribe(comAceptada => {
      const totalDividido =[];
      this.compartidasAceptadas = comAceptada;
      this.tamano = this.compartidasAceptadas.length;
          // total de la reservacion y dividirlo entre la persoas que han aceptado compartir
          this.reservaProvider.getProductos(this.idReservacion).subscribe(productos => {
            this.productos = productos;
            this.total2 = this.productos.reduce((acc, obj) => acc + obj.total, 0);
            this.resultadoCompartir=this.total2/this.tamano;
              totalDividido.push(this.resultadoCompartir);
              this.compartidasAceptadas.forEach(datacom => {
               //console.log('id com',datacom.idCompartir);
                //console.log('estatus com',this.resultadoCompartir);
                this.reservaProvider.compartirDividido(datacom.idCompartir,this.resultadoCompartir).then((respuesta: any) => {
               console.log("Respuesta: ", respuesta);
               });
            });
          });
    });
  }

  //mandar datos a la pagina del QR
  genararQR(idReservacion,totalDividido,idUsuario,telefono){
    this.navCtrl.setRoot(GenerarqrPage, {
      idReservacion: idReservacion,
      totalDividido: totalDividido,
      idUsuario: idUsuario,
      telefono: telefono
    });
  }

  //mandar datos a la pagina del QR
  genararQRNormal(idReservacion,total,idUsuario){
    this.navCtrl.setRoot(Generarqr_2Page, {
      idReservacion: idReservacion,
      total: total,
      idUsuario: idUsuario
    });
  }

  goBack() {
    this.navCtrl.setRoot(MisReservacionesPage);
  }


}
