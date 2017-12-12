import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-menu-navegacao></app-menu-navegacao>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
  styles: []
})
export class AppComponent {
  title = 'Meetups';
}
