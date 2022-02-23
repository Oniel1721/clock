import { Component, OnInit } from '@angular/core';
import Alarm from 'src/app/intefaces/alarm';
import CurrentAction from 'src/app/intefaces/currentAction';

@Component({
  selector: 'app-alarm-list',
  templateUrl: './alarm-list.component.html',
  styleUrls: ['./alarm-list.component.css']
})
export class AlarmListComponent implements OnInit {

  alarms:Alarm[] = [
    {
      hour: 2,
      minute: 5,
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: true,
      isActive: true,
      id: 0,
      meridian: 'pm',
    },
    {
      hour: 2,
      minute: 5,
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      saturday: true,
      sunday: true,
      isActive: true,
      id: 1,
      meridian: 'pm',
    },
    {
      hour: 2,
      minute: 59,
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: true,
      isActive: true,
      id: 2,
      meridian: 'am',
    },
  ]

  currentAction:null|CurrentAction = null

  onToggleActive(id:number){
    this.alarms[id].isActive = !this.alarms[id].isActive
  }

  constructor() { }

  ngOnInit(): void {
  }

}
