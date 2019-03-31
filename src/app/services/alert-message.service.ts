import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { IMessage } from "../interfaces/IMessage";

@Injectable({
  providedIn: 'root'
})
export class AlertMessageService {
  
  private successMessageEventSource = new BehaviorSubject({});
  public  successMessageEventObservableSubject = this.successMessageEventSource.asObservable();

  private dangerMessageEventSource = new BehaviorSubject({});
  public  dangerMessageEventObservableSubject = this.dangerMessageEventSource.asObservable();
  
  constructor() {}
  
  emitSuccessMessage(value: IMessage) {
    this.successMessageEventSource.next(value);
  }

  emitDangerMessage(value: IMessage) {
    this.dangerMessageEventSource.next(value);
  }

}
