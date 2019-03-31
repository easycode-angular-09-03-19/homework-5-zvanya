import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { Album } from "../interfaces/Album";

@Injectable({
  providedIn: 'root'
})
export class AlbumEventsService {
  private albumAddEventSource = new BehaviorSubject({});
  public  albumAddEventObservableSubject = this.albumAddEventSource.asObservable();

  private albumDeleteEventSource = new BehaviorSubject(-1);
  public  albumDeleteEventObservableSubject = this.albumDeleteEventSource.asObservable();

  private albumEditEventSource = new BehaviorSubject<Album>({id: -1, title: '', userId: 0});
  public  albumEditEventObservableSubject = this.albumEditEventSource.asObservable();

  private albumCancelEditEventSource = new BehaviorSubject(0);
  public  albumCancelEditEventObservableSubject = this.albumCancelEditEventSource.asObservable();

  private albumUpdatedEventSource = new BehaviorSubject({});
  public  albumUpdatedEventObservableSubject = this.albumUpdatedEventSource.asObservable();

  constructor() {}

  emitAddNewAlbum(value: Album) {
    this.albumAddEventSource.next(value);
  }
  
  emitDeleteAlbum(id: number) {
    this.albumDeleteEventSource.next(id);
  }
  
  emitEditAlbum(album: Album) {
    this.albumEditEventSource.next(album);
  }
  
  emitCancelEditAlbum() {
    this.albumCancelEditEventSource.next(0);
  }
  
  emitUpdatedAlbum(album: Album) {
    this.albumUpdatedEventSource.next(album);
  }
}
