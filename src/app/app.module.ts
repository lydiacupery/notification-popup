import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NotificationPopupComponent } from './notification-popup/notification-popup.component';

@NgModule({
  declarations: [AppComponent, NotificationPopupComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
