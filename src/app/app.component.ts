import { Component, OnInit } from '@angular/core';
import { Observable, of, interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { Popup } from './shared/popup.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  notificationStream$: Observable<Popup>;
  ngOnInit(): void {
    const numbers = interval(10000);
    this.notificationStream$ = numbers.pipe(
      map(x => ({
        text: `Received notification number ${x}`,
        displayMS: 5000
      }))
    );
    this.notificationStream$.subscribe(notification =>
      console.log('notification is', notification)
    );
  }
}
