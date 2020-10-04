import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin  } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Endpoints } from '../constants/endpoints';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataSource = new BehaviorSubject('default message');
  currentdata = this.dataSource.asObservable();

  constructor(private httpService: HttpService) { }

  searchSuperHeroes(name:String): Observable<any> {
    const url = `${environment.superHeroApiUrl}${environment.accss_token}${Endpoints.search}${name}`;
    return this.httpService.get(url);
  }

  getPwerstatsById(idList:any): Observable<any>{

    let poserStatsApiCalls=idList.map(heroId=> {
      const url = `${environment.superHeroApiUrl}${environment.accss_token}${heroId}${Endpoints.powerstats}`;
    return this.httpService.get(url);
    });

    return forkJoin(poserStatsApiCalls);

  }

  changeData(data: any) {
    this.dataSource.next(data)
  }

}
