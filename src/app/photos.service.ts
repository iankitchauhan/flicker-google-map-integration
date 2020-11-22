import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(private http: HttpClient) { }


  getPhotosApi(lat,long){
    const latitude = lat;
    const  longitude  = long;
 return this.http.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=c97e8f14e9c5448f9855f5c54ba122ed&accuracy=11&has_geo=1&geo_context=2&lat=${latitude}&lon=${longitude}&radius=&format=json&nojsoncallback=?`);
  }
}
