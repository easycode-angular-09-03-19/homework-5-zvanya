import { Component, OnInit, ViewChild } from '@angular/core';
import { AlbumsService } from "../../services/albums.service";
import { AlbumEventsService } from "../../services/album-events.service";
import { Album } from "../../interfaces/Album";
import { NgForm } from "@angular/forms";
import { AlertMessageService } from "../../services/alert-message.service";

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
  editMode = false;
  albumTitleSrc = '';
  isAlbumTitleChanged = false;
  
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
        this.editMode = true;
        this.album.title = album.title;
        this.albumTitleSrc = album.title;
        this.isAlbumTitleChanged = false;
      } else {
        this.album.id = -1;
        this.editMode = false;
        this.albumTitleSrc = '';
        this.isAlbumTitleChanged = false;
        this.form.resetForm();
      }
    });
  }
  
  onKeyUpTitleInput() {
    if (this.album.id !== -1) {
      this.isAlbumTitleChanged = this.album.title !== this.albumTitleSrc;
    }
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
  
        this.alertMessageService.emitSuccessMessage({
          title: `Добавление`,
          text: `Добавлен альбом ${data.id}`
        });
      });
    } else {
      this.albumService.editAlbum(newAlbum).subscribe((data: Album) => {
        this.albumEvents.emitUpdatedAlbum(data);
        this.album.id = -1;
        this.form.resetForm();
  
        this.alertMessageService.emitSuccessMessage({
          title: `Изменение`,
          text: `Изменен альбом ${data.id}`
        });
      }, (err) => {
        this.alertMessageService.emitDangerMessage({
          title: `Ошибка изменения`,
          text: err.message
        });
      });
    }
  }
}
