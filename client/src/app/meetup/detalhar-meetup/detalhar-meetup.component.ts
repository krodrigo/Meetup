import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Meetup } from '../models/meetup';
import { MeetupService } from '../services/meetup.service';

@Component({
  selector: 'app-detalhar-meetup',
  templateUrl: './detalhar-meetup.component.html'
})
export class DetalharMeetupComponent implements OnInit {
  public sub: Subscription;
  public meetupId: number = 0;
  public meetup: Meetup = new Meetup();

  constructor(private meetupService: MeetupService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.meetupId = params['id'];
      this.obterMeetup(this.meetupId);
    });
  }

  obterMeetup(id: number) {
    this.meetupService.obterMeetup(id)
    .subscribe(meetup => {
      this.meetup = meetup.data;
    })
  }
}
