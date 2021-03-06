import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { MateriasService } from '../../providers/materias-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	materias: any[] = [];
  constructor(public navCtrl: NavController,
  public alertCtrl: AlertController,
  public materiasService: MateriasService
  ) {

  }

  ionViewDidLoad(){
    this.getAllMaterias();
  }

  /*
  *Traer todas la materias
  */
  getAllMaterias(){
    console.log("getAllmaterias");
    this.materiasService.getAll()
    .then(materias => {
      console.log("materias: "+materias);
      this.materias = materias;
    })
  }

  openAlertNewMateria(){
    let alert = this.alertCtrl.create({
      title: 'Crear materia',
      message: 'escribe el nombre de la materia',
      inputs: [
        {
          name: 'title',
          placeholder: 'Digitar nueva materia.',
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: () =>{
            console.log('cancelar');
          }
        },
        {
          text: 'Crear',
          handler: (data)=>{ 
            data.completed = false;
            this.materiasService.create(data)
            .then(response => {
              this.materias.unshift( data );
            })
            .catch( error => {
              console.error( error );
            })
          }
        }
      ]
    });
    alert.present();
  }


}
