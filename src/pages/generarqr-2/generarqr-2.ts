
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReservacionDetallePage } from "../../pages/reservacion-detalle/reservacion-detalle";
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { UsuarioProvider } from "../../providers/usuario/usuario";

@IonicPage()
@Component({
  selector: 'page-generarqr-2',
  templateUrl: 'generarqr-2.html',
})
export class Generarqr_2Page {
    public idReservacion: string = null;
    public total: string = null;
    public idUsuario: string = null;
    public tarjeta: string = null;
    tarjetaPagar: any;
    //Crear variables para guardar los datos que se reciban de la reservacion
    private created_code= null;
    private qr_data = {
     "idReservacion": "",
     "total": "",
     "idUsuario": "",
     "tarjeta": ""
    }

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private qrScanner: QRScanner,
              public usuarioProv: UsuarioProvider) {
    //recibir datos de la reservacion normal
    this.idReservacion = this.navParams.get("idReservacion");
    this.total = this.navParams.get("total");
    this.idUsuario = this.navParams.get("idUsuario");
    //con id del usuario buscar su tarjeta registrada y activa para hacer el pago
      this.usuarioProv.getTarjetaPagar2(this.idUsuario).subscribe(pago => {
        this.tarjetaPagar = pago[0].idTarjeta;
        //guardar datos recibidos en el arreglo creado qr_data
        this.qr_data.idReservacion = this.idReservacion;
        this.qr_data.total = this.total;
        this.qr_data.idUsuario = this.idUsuario;
        this.qr_data.tarjeta = this.tarjetaPagar;
        //convertir arreglo en un JSON para generar el QR
        this.created_code = JSON.stringify(this.qr_data);
        console.log('datos unidos',this.created_code);
      });
    //obtener los datos del QR y sacarlo de uno por uno en la variable que manda el scanner
       //const dataCode = JSON.parse(this.created_code);
       //console.log('dataCode: ', dataCode.idReservacion);
       //console.log('dataCode: ', dataCode.total);
       //console.log('dataCode: ', dataCode.idUsuario);
       //console.log('dataCode: ', dataCode.tarjeta);
  }//termina constructor

  ionViewDidLoad() {
    console.log('ionViewDidLoad <Generarqr_2Page');
  }

  //funcion para regresar a la pagina anterior
  goBack() {
    this.navCtrl.push(ReservacionDetallePage, {
      idReservacion: this.idReservacion
    });
  }

}
