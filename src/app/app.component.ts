import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { PhotosService } from './photos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  data2: any;
  page = 0;
  size = 4;
  markers = [];
  constructor(private photo: PhotosService) { }
  ngOnInit(): void {
  }
  // google maps zoom level
  zoom: number = 8;

  // initial center position for the map
  lat: number = 28.644800;
  lng: number = 77.216721;

  clickedMarker(label: string, index: number) {
    this.getData({ pageIndex: 0, pageSize: 4 }, index);
    console.log(`clicked the marker: ${label || index}`)
  }

  mapClicked($event: MouseEvent) {
    let imageArray = [];
    this.photo.getPhotosApi($event.coords.lat, $event.coords.lng).subscribe((res: any) => {
      res.photos.photo.forEach(element => {
        element['url'] = `https://farm${element.farm}.staticflickr.com/${element.server}/${element.id}_${element.secret}.jpg`;
        imageArray.push(element['url']);
      });
      this.data2 = [...imageArray];
      this.markers.push({
        lat: $event.coords.lat,
        lng: $event.coords.lng,
        imageUrl: imageArray,
        label: 'click to view Images',
        draggable: true
      });
    });

  }
  getData(obj, indexes) {
    let index = 0;
    const  startingIndex = obj.pageIndex * obj.pageSize
    const   endingIndex = startingIndex + obj.pageSize;
    this.markers[indexes]['imageUrl'] = this.data2.filter(() => {
      index++;
      return (index > startingIndex && index <= endingIndex) ? true : false;
    });
  }

}

