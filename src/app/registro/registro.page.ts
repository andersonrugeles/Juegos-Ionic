import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
export let users:Array<any>=[];
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  public frm: FormGroup;
  public incremento:number=0;
  constructor(
    private _formBuider: FormBuilder,
    public alertController: AlertController,
    public navControl:NavController
  ) {
    this.frm = this._formBuider.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
          ),
        ])
      ),
      password: [null, Validators.required],
      confirm: [null, Validators.required],
    });
  }

  ngOnInit(): void {}
  async onSubmit() {
    const formRegistro = this.frm.value;
    const response=users.find(e=>e.email===formRegistro.email);
    if(!response){
      if (formRegistro.password === formRegistro.confirm) {
        this.incremento++;
        const user = {
          id:this.incremento,
          email: formRegistro.email,
          password: formRegistro.password,
        };
        users.push(user);
        const alert=await this.alertController.create({
          message:'Usuario agregado correctamente',
          buttons:['Aceptar']
        });
        await alert.present();
        this.frm.get('email').setValue('');
        this.frm.get('password').setValue('');
        this.frm.get('confirm').setValue('');
        setTimeout(() => {
          this.navControl.navigateRoot('/login');
        }, 1500);
      } else {
        const alert=await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Alerta!',
          message:'El password debe ser igual',
          buttons:['Aceptar']
        });
        await alert.present();
      }
    }else{
      const alert=await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Alerta!',
        message:'El email ya existe',
        buttons:['Aceptar']
      });
      await alert.present();
    }
  }
}

