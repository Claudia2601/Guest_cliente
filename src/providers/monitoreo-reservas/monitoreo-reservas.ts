import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from "firebase/app";

@Injectable()
export class MonitoreoReservasProvider {
  db = firebase.firestore();

  constructor(
    public afs: AngularFirestore,    
    ) {
    console.log('Hello MonitoreoReservasProvider Provider');
  }
  getReservaciones(idSucursal: string) {
    // this.afs.collection('reservaciones', ref => ref.where('idSucursal', '==', idSucursal)
    return new Promise((resolve, reject) => {
      this.db
        .collection('reservaciones')
        .where("idSucursal", "==", idSucursal)
        .where("estatus", '==', 'Aceptado')
        .orderBy('fechaR_', "asc")
        .get()
        .then(querySnapshot => {
          let arr = [];
          querySnapshot.forEach(function(doc) {
            var obj = JSON.parse(JSON.stringify(doc.data()));
            obj.$key = doc.id;
            console.log(obj);
            arr.push(obj);
          });

          if (arr.length > 0) {
            console.log("Document data:", arr);
            resolve(arr);
          } else {
            console.log("No such document!");
            resolve(null);
          }
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  getAllClientes(collection: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .collection(collection)
        .where("type", "==", "u")
        .get()
        .then(querySnapshot => {
          let arr = [];
          querySnapshot.forEach(function(doc) {
            var obj = JSON.parse(JSON.stringify(doc.data()));
            obj.$key = doc.id;
            console.log(obj);
            arr.push(obj);
          });

          if (arr.length > 0) {
            console.log("Document data:", arr);
            resolve(arr);
          } else {
            console.log("No such document!");
            resolve(null);
          }
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  
  getMisreservaciones(idUsuario: string) {
    
    return new Promise((resolve, reject) => {
      this.db
        .collection('reservaciones')        
        .orderBy('fechaR_', "asc")
        .get()
        .then(querySnapshot => {
          let arr = [];
          querySnapshot.forEach(function(doc) {
            var obj = JSON.parse(JSON.stringify(doc.data()));
            obj.$key = doc.id;
            console.log(obj);
            arr.push(obj);
          });

          if (arr.length > 0) {
            console.log("Document data:", arr);
            resolve(arr);
          } else {
            console.log("No such document!");
            resolve(null);
          }
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

}
