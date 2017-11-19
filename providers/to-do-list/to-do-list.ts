import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the ToDoListProvider provider.
  Cette class permet de externaliser du code, des méthodes, des attributs...

*/
@Injectable()
export class ToDoListProvider {

  /*********************************************************************************************************************
   * attribut de la class provider
   */
  public todoList = [];
/***********************************************************************************************************************
 * Constructeur
 * @param storage 
 */
  constructor(public storage: Storage) {

  }

  /*********************************************************************************************************************
  Méthodes CRUD sur la todoList
  */
  getAllTache() {
    //return this.storage.get('todoList');

    //retour d'une promesse d'une promesse.Whatttttt???????
    // programation évenementielle pur!
    return new Promise(
      // promesse  numéro 1
      (resolve, reject) => {
        // instruction de la première promesse qui quand elle sera résolu lancera .then()
      this.storage.get('todoList').then(
        //promesse numero 2 qui sera lancer quand la première sera lancée
        (data) => {
          this.todoList = JSON.parse(data) || [];
          //
          resolve(this.todoList);
        }
      )
    });
  }

  addOneTache(tache) {
    this.todoList.push(tache);
    //persistance des données
    this.persist();
  }

  updateOneTache(tache, position) {
    this.todoList[position] = tache;
    //persistance des données
    this.persist();
  }

  DeleteOneTache(position) {
    this.todoList.splice(position, 1);
    //persistance des données
    this.persist();
  }

  /**
   * persistance des données dans l'espace de stockage
   */

  private persist() {
    var lsData = JSON.stringify(this.todoList);
    this.storage.set('todoList', lsData)
  }
}
