import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { users } from '../registro/registro.page';
export let userLogued:any={};
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public frm: FormGroup;
  public users:Array<any>=users;
  constructor(
    public _formBuider: FormBuilder,
    public alertController: AlertController,
    public navControl:NavController
  ) {
    this.frm = this._formBuider.group({
      'email': new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
          ),
        ])
      ),
      'password': new FormControl('', Validators.required),
    });
  }
  

  ngOnInit(): void {


  }

  async onSubmit() {
    const loginForm=this.frm.value;
    const response=this.users.find(e=>e.email===loginForm.email&&e.password===loginForm.password);
    if(response){
      userLogued=response;
      localStorage.setItem('ingresado','true');
      this.navControl.navigateRoot('/home');
    }else{
      const alert=await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Alerta!',
        message:'Email o passsword incorrectos',
        buttons:['Aceptar']
      });
      await alert.present();
    }


  }
}
