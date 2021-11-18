import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalCarritoPageRoutingModule } from './modal-carrito-routing.module';

import { ModalCarritoPage } from './modal-carrito.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalCarritoPageRoutingModule
  ],
  declarations: [ModalCarritoPage]
})
export class ModalCarritoPageModule {}
