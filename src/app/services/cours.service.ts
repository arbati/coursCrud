import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cours } from '../models/Cours';

@Injectable({
  providedIn: 'root'
})
export class CoursService {

  url: string= "http://localhost:3000/cours";
  
  constructor(private http : HttpClient) { }


  getAll():Observable<Array<Cours>>{

    return this.http.get<Array<Cours>>(this.url);

  }


  searchByKeyword(keyword:string):Observable<Array<Cours>>{

    return this.http.get<Array<Cours>>(this.url+'?title_like='+keyword );

  }


  delete(id: number){

    return this.http.delete(this.url+"/"+id);

  }


  store(item: Cours){

    return this.http.post<Cours>(this.url,item);

  }


  update<Cours>(item: any){


    return this.http.put<Cours>(this.url+'/'+item.id,item);

  }



}
