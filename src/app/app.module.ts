import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { TimerComponent } from './components/timer/timer.component';
import { StopwatchComponent } from './components/stopwatch/stopwatch.component';
import { AlarmListComponent } from './components/alarm-list/alarm-list.component';
import { AlarmEditComponent } from './components/alarm-edit/alarm-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlarmComponent } from './components/alarm/alarm.component';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes = [
  {
    path: 'edit/:id',
    pathMatch: 'full',
    component: AlarmEditComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/clock'
  },
  {
    path: 'clock',
    pathMatch: 'full',
    component: AppComponent,
  }
]
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    TimerComponent,
    StopwatchComponent,
    AlarmListComponent,
    AlarmEditComponent,
    AlarmComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
