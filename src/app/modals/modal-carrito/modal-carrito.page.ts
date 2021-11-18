import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { GlobalComponent } from 'src/app/global';
import { carrito } from '../modal-detalle/modal-detalle.page';
export let carritoGlobal=[];
@Component({
  selector: 'app-modal-carrito',
  templateUrl: './modal-carrito.page.html',
  styleUrls: ['./modal-carrito.page.scss'],
})
export class ModalCarritoPage implements OnInit {
  public carro:Array<any>=GlobalComponent.obtenerCarrito();
  constructor(public modalController: ModalController,public alertController: AlertController,  public navControl:NavController) { }

  ngOnInit() {
  }
  cerrarModal(){
    this.modalController.dismiss();
  }
 async eliminar(id:number){
    const alert = await this.alertController.create({
      cssClass:'my-custom-class',
      header: 'Alerta!',
      message: '¿Estas seguro de eliminar el juego del carrito?',
      buttons: [
        {
          text: 'Cancelar',
        }, {
          text: 'Aceptar',
          role: 'aceptar',
          cssClass: 'secondary',
          handler: (blah) => {
            GlobalComponent.setearCarrito(carrito.filter(e=>e.juego.id!=id?e:''));
          }
        }
      ]
    });

    await alert.present();
  }
}
