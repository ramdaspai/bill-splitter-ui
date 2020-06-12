import { Observable } from 'rxjs';
import { Roommate } from './roommate.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({providedIn: 'root'})
export class RoommateService {

  constructor(private http: HttpClient) {}

  getRoommates() {
    return this.http.get('https://bill-splitter-services.herokuapp.com/api/roommates')
                .toPromise()
                .then(res => {
                  // console.log(res);
                  return res as Roommate[];
                });
  }

  updateRoommates(roommates: Roommate[]): Observable<any> {
    return this.http.post('https://bill-splitter-services.herokuapp.com/api/roommates/update', roommates);
  }

  deleteRoommates(roommates: Roommate[]): Observable<any> {
    return this.http.post('https://bill-splitter-services.herokuapp.com/api/roommates/delete', roommates);
  }

  searchByPhone(phone: string) {
    return this.http.get<Roommate>(`https://bill-splitter-services.herokuapp.com/api/roommates/${phone}`)
          .toPromise()
          .then(
            (response) => {
              console.log(response);
              return response as Roommate;
            }
          );
  }
}
