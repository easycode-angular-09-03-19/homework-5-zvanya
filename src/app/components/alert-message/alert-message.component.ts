import { Component, OnInit } from '@angular/core';
import { IMessage } from "../../interfaces/IMessage";
import { AlertMessageService } from "../../services/alert-message.service";

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.css']
})
export class AlertMessageComponent implements OnInit {
  visible = false;
  class = 'success';
  messageText = '';
  messageTitle = '';
  
  constructor(
    public alertMessageService: AlertMessageService
  ) { }

  ngOnInit() {
    this.alertMessageService.successMessageEventObservableSubject.subscribe((value: IMessage) => {
      if (value.title) {
        this.showSuccessMessage(value);
        setTimeout(() => {
          this.visible = false;
          this.messageText = '';
          this.messageTitle = '';
        }, 5000);
      }
    });

    this.alertMessageService.dangerMessageEventObservableSubject.subscribe((value: IMessage) => {
      if (value.title) {
        this.showDangerMessage(value);
        setTimeout(() => {
          this.visible = false;
          this.messageText = '';
          this.messageTitle = '';
        }, 5000);
      }
    });
  }

  private showSuccessMessage(value: IMessage) {
    this.visible = true;
    this.class = 'success';
    this.messageTitle = value.title;
    this.messageText = value.text;
  }
  
  private showDangerMessage(value: IMessage) {
    this.visible = true;
    this.class = 'danger';
    this.messageTitle = value.title;
    this.messageText = value.text;
  }
}
