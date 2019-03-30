import { Component, OnInit, ViewChild } from '@angular/core';
import { AlbumsService } from "../../services/albums.service";
import { AlbumEventsService } from "../../services/album-events.service";
import { Album } from "../../interfaces/Album";
import { NgForm } from "@angular/forms";
import {AlertMessageService} from "../../services/alert-message.service";

@Component({
  selector: 'app-add-album-form',
  templateUrl: './add-album-form.component.html',
  styleUrls: ['./add-album-form.component.css']
})
export class AddAlbumFormComponent implements OnInit {
  album = {
    id: -1,
    title: ''
  };
  @ViewChild('addAlbumForm') form: NgForm;
  constructor(
    public albumService: AlbumsService,
    public albumEvents: AlbumEventsService,
    public alertMessageService: AlertMessageService
  ) { }

  ngOnInit() {
    
    this.albumEvents.albumEditEventObservableSubject.subscribe((album: Album) => {
      if (album.id !== -1) {
        this.album.id = album.id;
        this.album.title = album.title;
      } else {
        this.album.id = -1;
        this.form.resetForm();
      }
    });
    
  }
  onFormSubmit() {
    const newAlbum = {
      id: this.album.id,
      userId: 1,
      title: this.album.title
    };
    
    if (this.album.id === -1) {
      this.albumService.addNewAlbum(newAlbum).subscribe((data: Album) => {
        this.albumEvents.emitAddNewAlbum(data);
        this.form.resetForm();
  
        this.alertMessageService.emitAlertMessage({
          object: 'album',
          item: data,
          type: 'add'
        });
      });
    } else {
      this.albumService.editAlbum(newAlbum).subscribe((data: Album) => {
        this.albumEvents.emitUpdatedAlbum(data);
        this.album.id = -1;
        this.form.resetForm();
  
        this.alertMessageService.emitAlertMessage({
          object: 'album',
          item: data,
          type: 'edit'
        });
      }, (err) => {
        this.alertMessageService.emitAlertMessage({
          object: 'error',
          item: err.message
        });
      });
    }
  }
}
