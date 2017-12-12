import { Component, OnInit } from '@angular/core';

import { MeetupService } from '../services/meetup.service';
import { Meetup } from '../models/meetup';

@Component({
  selector: 'app-listar-meetups',
  templateUrl: './listar-meetups.component.html'
})
export class ListarMeetupsComponent implements OnInit {

  constructor(private meetupService: MeetupService) { }
  public meetups: any;
  public errorMessage: string;

  ngOnInit() {
    this.meetupService.obterTodos()
    .subscribe(
      meetups => { 
        this.meetups = meetups.data,
        console.log(meetups) 
      },
    error => {
      this.errorMessage = error,
      console.log(error);
    });
  };
}
