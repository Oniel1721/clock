import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import Alarm from 'src/app/intefaces/alarm';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.css']
})
export class AlarmComponent implements OnInit {

  @Input('alarm')
  alarm:Alarm = {};

  @Output() toggle = new EventEmitter()
  
  parseMinutes(minute:number|any){
    return minute<10?`0${minute}`:`${minute}`
  }

  getContainerClass(alarm:Alarm){
    return alarm.isActive?'alarm-container active':'alarm-container'
  }

  getActivatorClass(alarm:Alarm){
    return alarm.isActive?'alarm-activator active':'alarm-activator'
  }

  getSwitchClass(alarm:Alarm){
    return alarm.isActive?'alarm-switch active':'alarm-switch'
  }

  parseDays(alarm:Alarm){
    let whichDays:string[] = []
    if(alarm.monday) whichDays.push('mon')
    if(alarm.tuesday) whichDays.push('tue')
    if(alarm.wednesday) whichDays.push('wed')
    if(alarm.thursday) whichDays.push('thu')
    if(alarm.friday) whichDays.push('fri')
    if(alarm.saturday) whichDays.push('sat')
    if(alarm.sunday) whichDays.push('sun')

    if(whichDays.length === 7)return 'all days'
    if(whichDays.length === 5 && whichDays.join('') === 'montuewedthufri') return 'week days'
    if(whichDays.length === 2 && whichDays.join('') === 'satsun') return 'weekend'
    if(whichDays.length === 2) return whichDays.join(' & ')
    if(whichDays.length === 1) return whichDays[0]
    
    let lastDay = ` & ${whichDays.pop()}`
    return whichDays.join(', ') + lastDay
  }

  toggleActive(){
    this.toggle.emit(this.alarm.id)
  }

  constructor() { }

  ngOnInit(): void {}

}
