import { Component, OnInit } from '@angular/core';
import Counter from 'src/app/intefaces/counter';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css'],
})
export class StopwatchComponent implements OnInit {
  startTime = 0;
  stopTime = 0;
  timeInStop = 0; 
  hour = '00';
  minute = '00';
  second = '00';
  mlsecond = '00';
  intervalId: any = 0;
  stop = false;
  optionBtnIndex = 0;
  laps: Counter[] = [];

  constructor() {}

  parseToTime(value: number): string {
    return `${value < 10 ? `0${value}` : value}`;
  }

  parseToNumber(value: string): number {
    return parseInt(value);
  }

  stopCounter() {
    this.stop = true;
    this.stopTime = Date.now()
    this.optionBtnIndex = 2
  }

  parseLapIndex(index:number){
    let indexToShow = this.laps.length - index
    return this.parseToTime(indexToShow)
  }

  resetLap(){
    this.laps = []
  }
  

  parseCounterToNumber({hour, minute, second, mlsecond}:any){
    return {
      hour: this.parseToNumber(hour),
      minute: this.parseToNumber(minute),
      second: this.parseToNumber(second),
      mlsecond: this.parseToNumber(mlsecond)
    }
  }

  parseCounterToTime({hour, minute, second, mlsecond}:{hour:number, minute:number, second:number, mlsecond:number}){
    return {
      hour: this.parseToTime(hour),
      minute: this.parseToTime(minute),
      second: this.parseToTime(second),
      mlsecond: this.parseToTime(mlsecond)
    }
  }

  calcDifference():string{
    if(this.laps.length === 0){
      return `${this.hour}:${this.minute}:${this.second}.${this.mlsecond}`
    }
    let currentCounter = this.parseCounterToNumber({hour: this.hour, minute: this.minute, second: this.second, mlsecond: this.mlsecond})
    let lastCounter = this.parseCounterToNumber(this.laps[0])

    let hour:number, minute:number, second:number, mlsecond:number;

    hour = currentCounter.hour - lastCounter.hour
    minute = currentCounter.minute - lastCounter.minute
    if(minute<0){
      hour--;
      minute += 60
    }
    second = currentCounter.second - lastCounter.second
    if(second<0){
      minute--;
      second += 60
    }
    mlsecond = currentCounter.mlsecond - lastCounter.mlsecond
    if(mlsecond<0){
      second--;
      mlsecond += 100
    }
    let difference = this.parseCounterToTime({hour, minute, second, mlsecond})

    return `${difference.hour}:${difference.minute}:${difference.second}.${difference.mlsecond}`
  }

  topScroll(){
    const $lasp = document.getElementById('stopwatch-laps');
    $lasp?.scroll({behavior: 'smooth', top: 0})
  }

  addLap() {
    if (this.intervalId !== 0) {
      const newLap = {
        hour: this.hour,
        minute: this.minute,
        second: this.second,
        mlsecond: this.mlsecond,
        difference: this.calcDifference()
      }
      this.laps.unshift(newLap);
      this.topScroll()
    }
  }

  resetCounter() {
    if (this.stop) {
      this.hour = '00';
      this.minute = '00';
      this.second = '00';
      this.mlsecond = '00';
      clearInterval(this.intervalId);
      this.intervalId = 0;
      this.stop = false;
      this.stopTime = 0;
      this.startTime = 0;
      this.timeInStop = 0;
      this.resetLap()
      this.optionBtnIndex = 0
    }
  }

  continueCounter() {
    this.timeInStop += Date.now() - this.stopTime
    this.stopTime = 0
    this.stop = false;
    this.optionBtnIndex = 1
  }

  setTimeValues(hour:number, minute:number, second:number, mlsecond:number){
    if(hour < 0 || minute <0 || second <0 || mlsecond<0) throw 'values cant be lower than 0'
    if( minute > 59 || second>59) throw 'minute and second cant be higher than 59'
    if(hour > 99 || mlsecond > 99) throw 'hour and mlsecond cant be higher than 99'
    this.mlsecond = this.parseToTime(mlsecond);
    this.second = this.parseToTime(second);
    this.minute = this.parseToTime(minute);
    this.hour = this.parseToTime(hour);
  }

  updateCounterTime(): any {
    let hour, minute, second, mlsecond, difference, auxiliar;
    difference = Date.now() - this.startTime - this.timeInStop
    auxiliar = difference;

    mlsecond = parseInt(`${(auxiliar % 1000) / 10}`);
    auxiliar -= auxiliar % 1000;
    auxiliar /= 1000;
    second = auxiliar % 60;
    auxiliar = parseInt(`${auxiliar / 60}`);
    minute = auxiliar % 60;
    auxiliar = parseInt(`${auxiliar / 60}`);
    hour = auxiliar > 99 ? 99 : auxiliar;

    if (
      (hour === 99 && minute === 59 && second === 59 && mlsecond === 99) ||
      auxiliar > 99
    ) {
      this.stopCounter();
      this.setTimeValues(99,59,59,99);
      return 0;
    }

    this.setTimeValues(hour, minute, second, mlsecond);
  }

  startCounter() {
    if (this.intervalId === 0) {
      this.stop = false;
      this.stopTime = 0;
      this.timeInStop = 0;
      this.startTime = Date.now();
      this.intervalId = setInterval(() => {
        if (!this.stop) {
          this.updateCounterTime();
        }
      }, 33);
      this.optionBtnIndex = 1
    }
  }

  ngOnInit(): void {}
}
