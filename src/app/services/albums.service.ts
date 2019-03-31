import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Album } from "../interfaces/Album";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {
  private apiUrl: string = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }

  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(`${this.apiUrl}/albums`);
  }
  
  addNewAlbum(value: Album) {
    return this.http.post(`${this.apiUrl}/albums`, value);
  }
  
  deleteAlbum(id: number) {
    return this.http.delete(`${this.apiUrl}/albums/${id}`);
  }
  
  editAlbum(album: Album) {
    return this.http.put(`${this.apiUrl}/albums/${album.id}`, album);
  }
}
