import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Observable, merge, fromEvent, combineLatest, interval } from 'rxjs';
import { map, startWith, tap, switchMap, filter } from 'rxjs/operators';
import { Popup } from '../shared/popup.model';

@Component({
  selector: 'app-notification-popup',
  templateUrl: './notification-popup.component.html',
  styleUrls: ['./notification-popup.component.scss']
})
export class NotificationPopupComponent implements OnInit {
  @Input()
  notification$: Observable<Popup>;
  @ViewChild('notificationPopup')
  smallContainer: ElementRef;
  isHover$: Observable<boolean>;
  showNotification: boolean;

  constructor() {}

  ngOnInit() {
    this.showNotification = false;
    this.isHover$ = merge(
      fromEvent(this.smallContainer.nativeElement, 'mouseover').pipe(
        map(() => true)
      ),
      fromEvent(this.smallContainer.nativeElement, 'mouseout').pipe(
        map(() => false)
      )
    ).pipe(startWith(false));

    this.notification$
      .pipe(
        tap(() => {
          this.showNotification = true;
        }),
        switchMap(popup =>
          combineLatest(interval(popup.displayMS), this.isHover$).pipe(
            filter(([timeout, hover]) => {
              return hover === false;
            })
          )
        ),
        tap(() => {
          this.showNotification = false;
        })
      )
      .subscribe();
  }
}
