import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { CargaArchivoProvider } from "../../providers/carga-archivo/carga-archivo";
// import { AngularFirestore } from '@angular/fire/firestore';
import { ReservacionesPage } from '../reservaciones/reservaciones';
import { TabsPage } from "../tabs/tabs";
import { AngularFirestore } from '@angular/fire/firestore';
import { EventosPage } from "../eventos/eventos";
import { Reservacion_1Page } from "../reservacion-1/reservacion-1";
import { SocialSharing } from "@ionic-native/social-sharing";

@IonicPage()
@Component({
  selector: "page-evento-detalle",
  templateUrl: "evento-detalle.html"
})
export class EventoDetallePage {
  evento: any = {};
  key: null;
  sucursalID: any;
  mostrar: any;
  tabBarElement: any;
  miUser: any = {};
  uidUserSesion: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _cap: CargaArchivoProvider,
    public afs: AngularFirestore,
    private socialSharing: SocialSharing
  ) {
    this.evento.uid = this.navParams.get("uid");
    this.sucursalID = this.navParams.get("sucursalID");
    this.uidUserSesion = this.navParams.get("uidUserSesion");

    console.log("key", this.evento.uid);
    console.log("SucursalID", this.sucursalID);
    //para ocultar las tabs en la pantalla de resumen
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    // _cap.getEvento(this.evento.key)
    //     .valueChanges().subscribe(evento=>{
    //       this.evento = evento;
    //     });
    // this.getDetails(this.evento.key);

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
    this.getDetails();
    console.log("ionViewDidLoad EventoDetallePage");
    this.mostrar = true;
    //this.ionViewWillEnter();
  }

  //funciones para ocultar las tabs
  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }
  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

  getDetails() {
    this._cap.getEvento(this.evento.uid).then(e => {
      this.evento = e;
      console.log("evento", e);
    });
  }

  Reservar(uid, idSucursal) {
    console.log(idSucursal);

    this.navCtrl.push(ReservacionesPage, {
      uid: uid,
      idSucursal: idSucursal,
      uidUserSesion: this.uidUserSesion
    });
  }

  goBack() {
    this.navCtrl.setRoot(TabsPage);
  }

  verEvento() {
    this.navCtrl.setRoot(EventosPage);
  }

  verReservacion() {
    this.navCtrl.setRoot(Reservacion_1Page);
  }

  compartir(evento: any) {
    this.socialSharing
      .shareViaFacebook(evento.titulo, null, evento.img)
      .then(() => { }) // se pudo compartir
      .catch(() => { }); // si sucede un error
  }
}
