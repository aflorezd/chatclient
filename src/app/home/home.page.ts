import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  msg = '';
  messages: any;
  currentUser = '';

  constructor(
    private socket: Socket,
    public alertController: AlertController) { }

  ngOnInit() {
    this.socket.connect();

    let name = '';
    this.currentUser = name;

    this.socket.emit('set-name', name);

    this.socket.fromEvent('uchanged').subscribe(data => {
      this.currentUser = data['username'];
    });

    this.socket.fromEvent('messages').subscribe(message => {
      this.messages = message;
      console.info('this.message => ', this.messages);
    });
  }

  changeUsername(newUserName){
    this.socket.emit('change-username',
      newUserName
    );
  }

  sendMessage() {
    this.socket.emit('new-message', {
      msg: this.msg,
      user: this.currentUser,
    });
    this.msg = '';
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Cambiar nombre de usuario',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'nombre',
          value: this.currentUser,
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Guardar',
          handler: data => {
            if (data.name != '')
              this.changeUsername(data.name);
            console.log('Confirm Ok => ', data);

          }
        }
      ]
    });

    await alert.present();
  }

}
