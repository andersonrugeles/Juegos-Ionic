import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { GlobalComponent } from 'src/app/global';
import { userLogued } from 'src/app/login/login.page';
export let carrito=[];
@Component({
  selector: 'app-modal-detalle',
  templateUrl: './modal-detalle.page.html',
  styleUrls: ['./modal-detalle.page.scss'],
})
export class ModalDetallePage implements OnInit {
  public cantidad: number = 1;
  constructor(
    public modalController: ModalController,
    public alertController: AlertController
  ) {}

  ngOnInit() {}
  cerrarModal() {
    this.modalController.dismiss();
  }
  agregarCantidad() {
    this.cantidad++;
  }
  async disminuirCantidad() {
    this.cantidad--;
    if (this.cantidad <= 0) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Alerta!',
        message: 'Valor no permitido',
        buttons: ['Aceptar'],
      });
      await alert.present();
      this.cantidad = 1;
    }
  }
  async agregarCarrito(game: any) {
      GlobalComponent.agregarCarrito(
        { 
          juego: game,
          cantidad: this.cantidad,
        }
      )
    const alert=await this.alertController.create({
      message:'Juego agregado correctamente',
      buttons:['Aceptar']
    });
    await alert.present();
    setTimeout(() => {
      this.cerrarModal();      
    }, 1500);
  }
}
