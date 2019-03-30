import { Component, OnInit } from '@angular/core';
import { Album } from "../../interfaces/Album";
import { AlertMessageService } from "../../services/alert-message.service";

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.css']
})
export class AlertMessageComponent implements OnInit {
  visible = false;
  class = 'success';
  message = '';
  
  constructor(
    public alertMessageService: AlertMessageService
  ) { }

  ngOnInit() {
    this.alertMessageService.alertMessageEventObservableSubject.subscribe((value: any) => {
      if (value.object) {
        this.showMessage(value);
        setTimeout(() => {
          this.visible = false;
        }, 5000);
      }
    });
  }

  private showMessage(value: any) {
    this.visible = true;
    switch (value.object) {
      case "album":
        switch (value.type) {
          case "delete":
            this.class = 'danger';
            this.message = `Удален альбом ${value.item.id}`;
            break;
          case "add":
            this.class = 'success';
            this.message = `Добавлен альбом ${value.item.id}`;
            break;
          case "edit":
            this.class = 'info';
            this.message = `Обновлен альбом ${value.item.id}`;
            break;
          default:
        }
        break;
      case "error":
        this.class = 'danger';
        this.message = value.item;
        break;
      default:
    }
  }
  
}
