import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagesLoginCorreoPage } from './pages-login-correo';

@NgModule({
  declarations: [
    PagesLoginCorreoPage,
  ],
  imports: [
    IonicPageModule.forChild(PagesLoginCorreoPage),
  ],
})
export class PagesLoginCorreoPageModule {}
