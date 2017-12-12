import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

import { Meetup } from '../models/meetup';
import { DataReturn } from '../models/data-return';

const urlServico: string = "http://localhost:49928/api/meetup/";
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable()
export class MeetupService {

  constructor(private http: HttpClient) { }

  obterTodos(): Observable<DataReturn<Meetup[]>> {
    return this.http
      .get<DataReturn<Meetup[]>>(urlServico)
      .pipe(tap(meetups => this.log('obter meetups')));
  }

  obterMeetup(id: number): Observable<DataReturn<Meetup>> {
    return this.http
      .get<DataReturn<Meetup>>(urlServico + id)
      .pipe(tap(meetup => this.log('obter meetup id=' + id)));
  }

  incluirMeetup(meetup: Meetup): Observable<DataReturn<Meetup>> {
    return this.http
      .post<DataReturn<Meetup>>(urlServico, meetup, httpOptions)
      .pipe(tap((meetup: DataReturn<Meetup>) => this.log('meetup incluído')));
  }

  editarMeetup(meetup: Meetup): Observable<DataReturn<Meetup>> {
    return this.http
      .put<DataReturn<Meetup>>(urlServico + meetup.id, meetup, httpOptions)
      .pipe(tap((meetup: DataReturn<Meetup>) => this.log('meetup editado')));
  }

  excluirMeetup(id: number): Observable<DataReturn<Meetup>> {
    return this.http
      .delete<DataReturn<Meetup>>(urlServico + id, httpOptions)
      .pipe(tap((meetup: DataReturn<Meetup>) => this.log('meetup excluido')));
  }

  private log(message: string) {
    console.log(message);
  }
}