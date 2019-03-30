import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AlertMessageService {
  
  private alertMessageEventSource = new BehaviorSubject({});
  public  alertMessageEventObservableSubject = this.alertMessageEventSource.asObservable();
  
  constructor() {}
  
  emitAlertMessage(value: any) {
    this.alertMessageEventSource.next(value);
  }
}
