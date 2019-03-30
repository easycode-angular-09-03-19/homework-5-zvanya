import { Component, OnInit } from '@angular/core';
import { AlbumsService } from '../../services/albums.service';
import { Album } from "../../interfaces/Album";
import { AlbumEventsService } from "../../services/album-events.service";

@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.css']
})
export class AlbumsListComponent implements OnInit {
  albums: Album[];

  constructor(
    public albumService: AlbumsService,
    public albumEvents: AlbumEventsService
  ) { }

  ngOnInit() {
    this.albumService.getAlbums().subscribe((data: Album[]) => {
      this.albums = data;
    }, (err) => {
      console.log(err);
    }, () => {
      console.log('complete');
    });

    this.albumEvents.albumAddEventObservableSubject.subscribe((data: Album) => {
      if (data.title) {
        this.albums.unshift(data);
      }
    });
    
    this.albumEvents.albumDeleteEventObservableSubject.subscribe((id: number) => {
      if (id > 0) {
        for (let i = 0; i < this.albums.length; i++) {
          if (this.albums[i].id === id) {
            this.albums.splice(i, 1);
            break;
          }
        }
      }
    });
  
    this.albumEvents.albumUpdatedEventObservableSubject.subscribe((album: Album) => {
      if (album.id) {
        this.albums.map((item) => {
          if (album.id === item.id) {
            item.title = album.title;
          }
        });
      }
    });
  }
}
