import { Component, OnInit, Input } from '@angular/core';
import { Album } from "../../interfaces/Album";
import { AlbumsService } from "../../services/albums.service";
import { AlbumEventsService } from "../../services/album-events.service";
import { AlertMessageService } from "../../services/alert-message.service";

@Component({
  selector: 'app-album-item',
  templateUrl: './album-item.component.html',
  styleUrls: ['./album-item.component.css']
})
export class AlbumItemComponent implements OnInit {
  editMode = false;
  editClass = 'primary';
  
  @Input() item: Album;
  constructor(
    public albumService: AlbumsService,
    public albumEvents: AlbumEventsService,
    public alertMessageService: AlertMessageService
  ) {}

  ngOnInit() {
    this.albumEvents.albumEditEventObservableSubject.subscribe((album: Album) => {
      if (this.item.id !== album.id) {
        this.editMode = false;
        this.editClass = 'primary';
      }
    });
    
    this.albumEvents.albumUpdatedEventObservableSubject.subscribe((album: Album) => {
      if (this.item.id === album.id) {
        this.editMode = false;
        this.editClass = 'primary';
      }
    });
  }
  
  editAlbum() {
    this.editMode = !this.editMode;
    if (this.editMode) {
      this.editClass = 'dark';
      this.albumEvents.emitEditAlbum(this.item);
    } else {
      this.editClass = 'primary';
      this.albumEvents.emitEditAlbum({id: -1, title: '', userId: 0});
    }
  }
  
  deleteAlbum() {
    let res = confirm(`Удалить альбом ${this.item.id}?`);
    
    if (res) {
      this.albumService.deleteAlbum(this.item.id).subscribe((data: Album) => {
        // На самом деле код из блока complete должен быть в этом блоке,
        // но т.к. сервер делает фейковые удаления, то код в блоке complete
      }, (err) => {
        console.log(err);
      }, () => {
        this.albumEvents.emitDeleteAlbum(this.item.id);
        this.alertMessageService.emitDangerMessage({
          title: `Удаление. Пользователь: ${this.item.userId}`,
          text: `Удален альбом ${this.item.title}`
        });
      });
    }
  }
  
}
