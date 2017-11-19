import { Camera, CameraOptions } from '@ionic-native/camera';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { ToDoListProvider } from '../../providers/to-do-list/to-do-list';

/**
 * Generated class for the FormulairetachePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-formulairetache',
  templateUrl: 'formulairetache.html',
})
export class FormulairetachePage {

  public titreFormulaire;
  public tache;
  public position;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public provider: ToDoListProvider,
    public camera: Camera) {

    this.titreFormulaire = navParams.get('formulaireTitre');
    this.tache = navParams.get('tache');
    this.position = navParams.get('index');
    console.log(this.position);
    console.log(this.tache);

  }


  SaveFormulaire() {
    if (this.tache.titre) {
      //Modification d'une tâche si position superieur à -1 (valeur passée en cas de nouvelle tâche)
      console.log(this.position);
      if (this.position != null) {
        // modification d'un tache 
        this.provider.updateOneTache(this.tache, this.position);

      } else {//position est null donc ajout d'une tâche
        // ajout d'une tàache
        this.provider.addOneTache(this.tache);
      }
      //Retour à la liste des tâches
      this.navCtrl.pop();
    }
  }


  prendrePhoto() {
    var options:CameraOptions = {
      // on enregistre la photo serializer 
      destinationType: this.camera.DestinationType.DATA_URL,
      // si on definit pas de taille,
      targetHeight: 500,
      targetWidth: 500
    };

    // la get picture renvoie une promesse (le temps que l'utilisateur prenne la photo)
    this.camera.getPicture(options).then(
      (imageData)=>{
        console.log(imageData);
        this.tache.image="data:image/jpeg;base64,"+ imageData;
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormulairetachePage');
  }

}
