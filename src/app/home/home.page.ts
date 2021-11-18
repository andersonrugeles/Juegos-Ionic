import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController, NavController,ToastController  } from '@ionic/angular';
import { ModalDetallePage } from '../modals/modal-detalle/modal-detalle.page';
import { ModalCarritoPage } from '../modals/modal-carrito/modal-carrito.page';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { AlertController } from '@ionic/angular';
import axios from 'axios';
import { userLogued } from '../login/login.page';
import { GlobalComponent } from '../global';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  public games: Array<any> = [];
  public frm: FormGroup;
  public peticion:Boolean=false;
  public user:any={};
  public carrito: Array<any> = GlobalComponent.obtenerCarrito();
  constructor(
    public modalController: ModalController,
    private _formBuider: FormBuilder,
    public navControl: NavController,
    public alertController: AlertController,
    public toastController: ToastController,
    private menu: MenuController
  ) {
  }

  ngOnInit(): void {
    this.cargarJuegos();
  }
  ionViewDidEnter(){
    this.obtenerCarrito();
  }

  ngOnChanges(): void {    
  }
  volver() {
    const logueado = localStorage.getItem('ingresado');
    if (logueado === 'true') {
      this.navControl.navigateRoot('/home');
    } else {
      this.navControl.navigateRoot('/login');
    }
  }
  async cargarJuegos() {
    this.user=userLogued;
    try {
      const response = await axios({
        method: 'GET',
        url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
        headers: {
          'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
          'x-rapidapi-key':
            '6adf80196fmsh53f06dcc1f4795ep1e75f1jsnc73ee372cca0',
        },
      });
      const data = await response.data;
      if(data){
        for (let index = 0; index < 20; index++) {
          this.games.push(data[index]);
        }
        this.peticion=true;
      }
    } catch (error) {
      console.error(error);
    }
  }
  async abrirModal(game:any) {
    const modal = await this.modalController.create({
      component: ModalDetallePage,
      componentProps: {
        game: game
      },
    });
    await modal.present();
    await modal.onWillDismiss();
  }
  obtenerCarrito(){
    this.carrito=GlobalComponent.obtenerCarrito();
  }
  async close(){
    const alert = await this.alertController.create({
      cssClass:'my-custom-class',
      header: 'Alerta!',
      message: '¿Deseas cerrar sesion?',
      buttons: [
        {
          text: 'Cancelar',
        }, {
          text: 'Aceptar',
          role: 'aceptar',
          cssClass: 'secondary',
          handler: (blah) => {
            localStorage.setItem('ingresado','false');
            this.navControl.navigateRoot('/login');
          }
        }
      ]
    });

    await alert.present();
  }
  abrirMenu() {
    this.menu.open('first');
  }
  cerrarMenu(){
  this.menu.close();
  }
 async abrirCarrito() {
    const cantidad=GlobalComponent.obtenerCantidadCarrito();
    if(cantidad>0){
      this.navControl.navigateRoot('/carrito');
      this.cerrarMenu();
    }else{
      const alert=await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Alerta!',
        message:'Debes agregar juegos al carrito',
        buttons:['Aceptar']
      });
      await alert.present();
    }
  }
}
