import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { Meetup } from '../models/meetup';
import { MeetupService } from '../services/meetup.service';

@Component({
  selector: 'app-excluir-meetup',
  templateUrl: './excluir-meetup.component.html'
})
export class ExcluirMeetupComponent implements OnInit {
  public errors: any[] = [];
  public sub: Subscription;
  public meetupId: number = 0;
  public meetup: Meetup = new Meetup();

  constructor(
    private meetupService: MeetupService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      params => {
        this.meetupId = params['id'];
        this.obterMeetup(this.meetupId);
      });
  }

  obterMeetup(id: number) {
    this.meetupService.obterMeetup(id)
      .subscribe(meetup => {
        this.meetup = meetup.data;
      });
  }

  public excluirMeetup() {
    this.meetupService.excluirMeetup(this.meetupId)
      .subscribe(
      resultado => this.onDeleteComplete(resultado),
      error => this.onError(error));
  }

  public onDeleteComplete(evento: any) {
    this.errors = [];
    this.router.navigate(['/meetups']);
  }

  onError(data) {
    console.log(data);
    this.errors = Object.assign([], data.error.errors);
  }
}
