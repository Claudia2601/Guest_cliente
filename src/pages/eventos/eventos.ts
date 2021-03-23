import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventoDetallePage } from "../../pages/evento-detalle/evento-detalle";
//Plugins
import { SocialSharing } from '@ionic-native/social-sharing';
import { AngularFireDatabase } from '@angular/fire/database';
// import { Observable } from 'rxjs/Observable';
//import { CargaArchivoProvider } from "../../providers/carga-archivo/carga-archivo";
import { UsuarioProvider } from '../../providers/usuario/usuario';
//import { UserProvider } from '../../providers/user/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { Reservacion_1Page } from '../reservacion-1/reservacion-1';
//import { PushNotiProvider } from '../../providers/push-noti/push-noti';

@IonicPage()
@Component({
  selector: "page-eventos",
  templateUrl: "eventos.html"
})
export class EventosPage {
  //hayMas:boolean= true;
  eventos = [];
  filterPost: "";
  uidUserSesion: any;
  usuarios: any;
  miUser: any = {};
  sucursales: any;
  //playerID: any;
  //userID: any;


  constructor(
    //private _cap: CargaArchivoProvider,
    private socialSharing: SocialSharing,
    public navCtrl: NavController,
    public afDB: AngularFireDatabase,
    public navParams: NavParams,
    public _cap: UsuarioProvider,
    public afs: AngularFirestore
    //public _providerPushNoti: PushNotiProvider,
    //  public _providerUser: UserProvider
  ) {
    //sacar el id del usuario del local storage
    this.uidUserSesion = localStorage.getItem('uid');
    console.log('id del usuario en eventos', this.uidUserSesion);

    //obtener informacion de todos los usuarios
    this.afs
      .collection("users")
      .valueChanges()
      .subscribe(dataUser => {
        this.usuarios = dataUser;
        console.log('users todos', this.usuarios);
      });
    //obtener informacion de todos los eventos
    this.afs
      .collection("evento")
      .valueChanges()
      .subscribe(data => {
        this.eventos = data;
        console.log('eventos todos', this.eventos);
      });
    //obtener informacion de todas las sucursales

    //obtener informacion de todas las sucursales
    this.afs
      .collection("sucursales")
      .valueChanges()
      .subscribe(dataSu => {
        this.sucursales = dataSu;
        console.log('sucursales todos', this.sucursales);
      });
    //  afDB.list('evento').valueChanges().subscribe( e =>  {
    //    this.eventos = e;
    //  })

    //obtener informacion de mi user
    this.afs
      .collection("users").doc(this.uidUserSesion)
      .valueChanges()
      .subscribe(dataSu => {
        this.miUser = dataSu;
        console.log('Datos de mi usuario', this.miUser);
      });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad EventosPage");
    //this._providerPushNoti.init_push_noti();
    //this.guardarPlayerID();
  }


  compartir(evento: any) {
    this.socialSharing
      .shareViaFacebook(evento.titulo, null, evento.img)
      .then(() => { }) // se pudo compartir
      .catch(() => { }); // si sucede un error
  }

  compartirInsta(evento: any) {
    this.socialSharing
      .shareViaInstagram(evento.titulo, evento.img)
      .then(() => { }) // se pudo compartir
      .catch(() => { }); // si sucede un error
  }

  verDetalle(uid, sucursalID) {
    this.navCtrl.setRoot(EventoDetallePage, {
      uid: uid,
      sucursalID: sucursalID,
      uidUserSesion: this.uidUserSesion
    });
  }

  verEvento() {
    this.navCtrl.setRoot(EventosPage);
  }

  verReservacion() {
    this.navCtrl.setRoot(Reservacion_1Page);
  }
}
