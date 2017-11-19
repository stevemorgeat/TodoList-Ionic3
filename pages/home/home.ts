import { Component } from '@angular/core';
import { NavController, NavParams, Events, ToastController, AlertController, ItemSliding } from 'ionic-angular';
import { FormulairetachePage } from '../formulairetache/formulairetache';
import { ToDoListProvider } from '../../providers/to-do-list/to-do-list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  /**
   * attribut de la class
   */
  public todoList: any;


  /**
   * constructeur où on déclare ici un abonnement a un 'event'. Lors de la publication de ce 
   * dernier sur une autre page, la fonction anonyme récupère les datas transmis (une sorte de callback)
   * les données sont stringify. donc JSON.parse
   * La callBack peut ne pas contenir de datas mais effectuer des opérations une fois l'évement publier. 
   */
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public provider: ToDoListProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController) {
  }///fin constructeur

  /**
   *  méthode de la class
   */

  // méthode qui se lance lorsqu'on entre sur la page
  ionViewDidEnter() {
    // utilisation du provider et de ses méthodes.
    // ici on crée un tunnel entre l'attribut de cette page todoList et celui du provider.
    // donc des quil y a une modification sur this.todoList, cela modifie celui du provider
    // this.todoList ici présent est un "lien" de celui du provider.
    this.provider.getAllTache().then(
      (data) => {
        this.todoList = data;
      }
    );
  }


  checkBoxCheck(position) {
    //au changement de statue de la checkbox j'affecte son contraire,
    //sachant que (la checkbox checkée) = true
    this.todoList[position].fait = !this.todoList[position].fait;
    console.log(this.todoList[position].fait);
  }


  /**
   * Affichage du formulaire pour ajouter une tâche
   */
  createTache() {
    //Nouvelle tâche pour ajout, je crée un objet tache
    let newTache = { title: '', text: '', image: null, fait: false };
    //Navigation vers la page formulaire avec transmission de paramètre
    this.navCtrl.push(
      //page du formulaire
      FormulairetachePage,
      { tache: newTache, formulaireTitre: "Ajout d'une tâche", posistion: null }
    );
  }

  /**
   * Suppression d'un tache
   * @param posistion 
   */
  deleteTache(posistion) {
    var tache = this.todoList[posistion];
    // création de toast de validation avec les attribut message, duration et placement (position top bottom middle)
    var toastOk = this.toastCtrl.create({
      message: "suppression de l'élement " + tache.titre + " effectuée",
      duration: 2000,
      position: "middle"
    });
    // toast pour l'annulation
    var toastAnnuler = this.toastCtrl.create({
      message: "suppression de l'élement " + tache.titre + " annulée",
      duration: 2000,
      position: "middle"
    });


    //création d'une boite de dialogue pour la confirmation
    // on utilise la methode create sur le alerteController
    var BoiteDeDaliogueConfirmation = this.alertCtrl.create(
      // à cette methode on definit des attribut, titre/message/sous-titre
      {
        title: "Confirmation",
        message: "Voulez-vous vraiment supprimer l'élement " + tache.titre + " ?",
        subTitle: "Lisez ceci avant de cliquer!",
        //tableau des boutons à afficher lors de l'apparition de la boite
        buttons: [
          //bouton annuler
          {
            // text, role (ici annuler), handler lance une fonction anonyme 
            text: "Annuler", role: "cancel", handler: () => {
              toastAnnuler.present();
            }
          },//bouton annuler
          {
            //attribut text, fonction anonyme handler avec des instructions
            text: "valider", handler: () => {
              // suppression avec splice de l'item splice(index de l'item, le nombre d'item à supprimer)
              this.todoList.splice(posistion, 1);
              // on lance le toastOK avec present()
              toastOk.present();
            }/// fin fonction handler
          }/// fin button valider
        ]///fin button
      }///fin création boite
    );/// fin d'affectation à la variable

    //lance la boite de dialogue créée juste au dessus ( donc lors de l'appel de l'option trash( supprimer))
    BoiteDeDaliogueConfirmation.present();

    // suppression avec splice de l'item splice(index de l'item, le nombre d'item à supprimer)
    //splice basique avec la position dans le tableau et le nombre d'entré à supprimer
    //this.todoList.splice(posistion, 1);// deplacé dans la confirmation valider
  }/// fin deleteTache


  /**
   * Affichage du formulaire pour modifier une tâche et fermeture du sliding de l'option
   * @param posistion 
   * @param itemSlidingCourant 
   */
  editTache(posistion, itemSlidingCourant: ItemSliding) {
    //on récupère la tâche pour la modif
    let editTache = this.todoList[posistion];
    console.log(posistion);
    //Navigation vers la page formulaire avec transmission de paramètre
    this.navCtrl.push(
      FormulairetachePage,
      { tache: editTache, formulaireTitre: "Modification d'une tâche", index: posistion }
    );
    //fermeture du sliding des options
    itemSlidingCourant.close();
  }


  /**
   * Nettoyage des taches finies
   */
  clearTaches() {

    // création de toast de validation avec les attribut message, duration et placement (position top bottom middle)
    var toastOk = this.toastCtrl.create({
      message: "Ménage effectué",
      duration: 2000,
      position: "middle"
    });
    // toast pour l'annulation
    var toastAnnuler = this.toastCtrl.create({
      message: "annulation du nettoyage de la  todoList",
      duration: 2000,
      position: "middle"
    });

    //création d'une boite de dialogue pour la confirmation
    // on utilise la methode create sur le alerteController
    var BoiteDeDaliogueConfirmation = this.alertCtrl.create(
      // à cette methode on definit des attribut, titre/message/sous-titre
      {
        title: "Confirmation",
        message: "Voulez-vous vraiment nettoyer la liste?",
        subTitle: "Lisez ceci avant de cliquer!",
        //tableau des boutons à afficher lors de l'apparition de la boite
        buttons: [
          //bouton annuler
          {
            // text, role (ici annuler), handler lance une fonction anonyme 
            text: "Annuler", role: "cancel", handler: () => {
              toastAnnuler.present();
            }
          },//bouton annuler
          {
            //attribut text, fonction anonyme handler avec des instructions
            text: "valider", handler: () => {
              var todoList = this.todoList;
              // boucle sur le tableau de la liste de tâches
              for (var i = 0; i < todoList.length; i++) {
                if (todoList[i].fait) {
                  // suppression avec splice de l'item de la liste si son attribut fait est true
                  todoList.splice(i, 1);
                }
              }
              // on lance le toastOK avec present()
              toastOk.present();
            }/// fin fonction handler
          }/// fin button valider
        ]///fin button
      }///fin création boite
    );/// fin d'affectation à la variable

    //lance la boite de dialogue créée juste au dessus ( donc lors de l'appel de l'option clear)
    BoiteDeDaliogueConfirmation.present();


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TodoListPage');
  }
}
