import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, FormControlName, Validators } from "@angular/forms";
import { Router } from '@angular/router';

import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';

import { GenericValidator } from '../../common/generic.form.validator';
import { Meetup } from '../models/meetup';
import { MeetupService } from '../services/meetup.service';

@Component({
  selector: 'app-incluir-meetup',
  templateUrl: './incluir-meetup.component.html'
})
export class IncluirMeetupComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  public errors: any[] = [];
  public displayMessage: { [key: string]: string } = {};
  public meetupForm: FormGroup;
  public meetup: Meetup = new Meetup();

  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator

  constructor(private formBuilder: FormBuilder, private meetupService: MeetupService, private router: Router) {
    this.validationMessages = this.meetup.validationMessages;
    this.genericValidator = new GenericValidator(this.validationMessages);
    this.meetup = new Meetup();
  }

  ngOnInit() {
    this.meetupForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      descricao: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      data: ['', Validators.required],
      local: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(150)]]
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, "blur"));

    Observable.merge(...controlBlurs).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.meetupForm);
    });
  }
  
  incluirMeetup() {
    if(this.meetupForm.dirty && this.meetupForm.valid) {
      let p = Object.assign({}, this.meetup, this.meetupForm.value);

      var parts = p.data.split('/');
      p.data = new Date(parts[2] + '-' + parts[1] + '-' + parts[0]);

      this.meetupService.incluirMeetup(p)
      .subscribe(
        resultado => { this.onSaveComplete() },
        error => { this.onError(error) }
      );
    }
  }

  onSaveComplete(): void {
    this.meetupForm.reset();
    this.errors = [];
    this.router.navigate(['/meetups']);
  }

  onError(data) {
    console.log(data);
    this.errors = Object.assign([], data.error.errors);
  }
}
