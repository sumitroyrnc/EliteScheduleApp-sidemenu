import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/observable';

/*
  Generated class for the EliteApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EliteApiProvider {

  private baseUrl = 'https://elite-schedule-app-b5ebc.firebaseio.com/';
  public currentTourney: any = {};
  constructor(public http: Http) {
    console.log('Hello EliteApiProvider Provider');
  }

  getTournaments() {
    return new Promise(
      resolve => {
        this.http.get(`${this.baseUrl}/tournaments.json`).subscribe(
          res => resolve(res.json())
        )
      })
  }

  getTournamentData(tourneyId: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/tournaments-data/${tourneyId}.json`)
      .map(response => {
        this.currentTourney = response.json();
        return this.currentTourney;
      }
      );
  }

  getCurrentTourney() {
    return this.currentTourney;
  }
}
