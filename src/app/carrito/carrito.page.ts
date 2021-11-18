import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController, ToastController } from '@ionic/angular';
import { GlobalComponent } from '../global';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  public carro:Array<any>=GlobalComponent.obtenerCarrito();
  constructor(public modalController: ModalController,public toastController: ToastController,public alertController: AlertController,  public navControl:NavController) { }

  ngOnInit() {
  }
  cerrarModal(){
    this.navControl.navigateRoot('/home');
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
            const copyCarrito=GlobalComponent.obtenerCarrito();
            GlobalComponent.setearCarrito(copyCarrito.filter(e=>e.juego.id!=id?e:''));
            this.carro=GlobalComponent.obtenerCarrito();
            if(this.carro.length===0){
              setTimeout(() => {
                this.navControl.navigateRoot('/home');
              }, 1000);
            }
          }
        }
      ]
    });

    await alert.present();
  }
  async reservar(){
    GlobalComponent.setearCarrito([])
    const toast = await this.toastController.create({
      header:"Exitoso!",
      message: 'Reservacion exitosa',
      duration: 2000,
      position: 'top'
    });
    toast.present();
    setTimeout(() => {
      this.navControl.navigateRoot('/home');
    }, 1500);
  }

}
