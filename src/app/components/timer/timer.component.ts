import { Component, OnInit } from '@angular/core';
import TimeAdder from 'src/app/intefaces/time.adder';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  startTime = {
    hour: "00",
    minute: "00",
    second: "00",
  }
  hour = '00';
  minute = '00';
  second = '00';
  intervalId: any = 0;
  stop = false;

  optionBtnIndex = 0;

  alarmIsPlaying:boolean = false

  adders: TimeAdder[] = [
    {amount:10, property: 'minute'},
    {amount:1, property: 'minute'},
    {amount:15, property: 'second'},
  ];

  constructor() {}

  parseToTime(value: number): string {
    return `${value < 10 ? `0${value}` : value}`;
  }

  parseToNumber(value: string): number {
    return parseInt(value);
  }

  setCounterValuesToStartTime(){
    this.hour = this.startTime.hour
    this.minute = this.startTime.minute
    this.second = this.startTime.second
  }

  setStartTime(hour:string, minute:string, second:string){
    this.startTime.hour = hour
    this.startTime.minute = minute
    this.startTime.second = second
    window.localStorage.setItem("timer-startTime", `${hour}:${minute}:${second}`)
  }

  initStartTime(){
    let values:any = window.localStorage.getItem("timer-startTime")?.split(':')
    if(!values) return 
    this.startTime.hour = values[0]
    this.startTime.minute = values[1]
    this.startTime.second = values[2]
    this.setCounterValuesToStartTime()
  }

  stopCounter() {
    this.stop = true;
    this.optionBtnIndex = 2
  }

  playAlarm(){
    const $timerContainer:any = document.getElementById('timer-container')
    const $audio = document.createElement('audio')
    $audio.src = "../../../assets/JoJo's Bizarre Adventure Opening 2 - Bloody Stream (No SFX) (1).mp3"
    $audio.id = 'timer-audio'
    $timerContainer.appendChild($audio)
    $audio.play()
    $timerContainer.style.color = 'crimson'
    this.alarmIsPlaying = true
    this.optionBtnIndex = 3
  }

  stopAlarm(){
    const $audio:any = document.getElementById("timer-audio")
    const $timerContainer:any = document.getElementById('timer-container')
    $audio.pause()
    $timerContainer.removeChild($audio)
    $timerContainer.style.color = 'inherit'
    this.alarmIsPlaying = false
    this.optionBtnIndex = 0
  }

  addMount(property:string, value:number){
    let hour = this.parseToNumber(this.hour)
    let minute = this.parseToNumber(this.minute)
    let second = this.parseToNumber(this.second)

    if(property === "hour"){
      hour+=value
    }
    if(property === "minute"){
      minute+=value
    }
    if(property === "second"){
      second+=value
    }

    if(second>59){
      second-=60
      minute++
    }
    if(minute >59){
      minute-=60
      hour++
    }
    if(hour>99){
      hour=99
    }
    let auxiliarValue = {
      hour: this.parseToTime(hour),
      minute: this.parseToTime(minute),
      second: this.parseToTime(second)
    }
    if(this.intervalId === 0){
      this.setStartTime(auxiliarValue.hour,auxiliarValue.minute,auxiliarValue.second)
      this.setCounterValuesToStartTime()
    }
    else{
      this.hour = auxiliarValue.hour
      this.minute = auxiliarValue.minute
      this.second = auxiliarValue.second
    }
  }

  onAddMount(e:any){
    let value = parseInt(e.target.outerText)
    let property = e.target.nextSibling.textContent.trim()
    if(property === 'sec') property+='ond'
    if(property === 'min') property+='ute'
    if(property === 'hr') property = 'hour'
    this.addMount(property, value)
  }

  setCounterValue(id:string, value:number = -1){
    if(id === 'hour'){
      if(value !== -1){
        this.hour = this.parseToTime(value)
      }
    } 
    if(id === 'minute'){
      if(value !== -1){
        this.minute = this.parseToTime(value)
      }
    }
    if(id === 'second'){
      if(value !== -1){
        this.second = this.parseToTime(value)
      }
    }
  }



  onResetCounter(){
    if(!this.alarmIsPlaying){
      this.setCounterValuesToStartTime()
      this.stop = true
      clearInterval(this.intervalId)
      this.intervalId = 0
      this.optionBtnIndex = 0
    }
  }

  setInputsValues(target:any, id:string){
    if(id === "hour") {
      target.value = this.hour
      document.getElementById("timer-counter-minute")?.focus()
    }
    if(id === "minute") {
      target.value = this.minute
      document.getElementById("timer-counter-second")?.focus()
    }
    if(id === "second") {
      target.value = this.second
    }
    if(this.intervalId === 0){
      this.setStartTime(this.hour, this.minute, this.second)
    }
  }


  onCounterChange(e:any){
    let targetValue = e.target.value
    let value = parseInt(!targetValue?0:targetValue)
    let id = e.target.id.split('-')[2]
    let validValue = true
    if(id === 'hour' && value >99){
      this.setCounterValue(id)
      validValue = false
    }
    if(((id === 'minute' || id === 'second') && value > 59) && validValue){
      this.setCounterValue(id)
      validValue = false
    }
    if(value <0  && validValue){
      this.setCounterValue(id)
      validValue = false
    }
    if(validValue) this.setCounterValue(id, value)
    this.setInputsValues(e.target, id)
  }

  continueCounter() {
    this.stop = false;
    this.optionBtnIndex = 1
  }

  setAlarm(){
    this.onResetCounter()
    this.playAlarm()
  }

  countDown(){
    if(this.hour === "00" && this.minute === "00" && this.second === "00"){
      this.setAlarm()
      return
    }
    let hour = this.parseToNumber(this.hour)
    let minute = this.parseToNumber(this.minute)
    let second = this.parseToNumber(this.second)

    second--
    if(second<0){
      second = 59
      minute--
      if(minute<0){
        minute = 59
        hour--
      }
    }

    this.hour = this.parseToTime(hour)
    this.minute = this.parseToTime(minute)
    this.second = this.parseToTime(second)
  }

  startCounter() {
    if(this.intervalId === 0 && parseInt(this.hour+this.minute+this.second) >0 && !this.alarmIsPlaying){
      this.optionBtnIndex = 1
      this.stop = false
      this.countDown()
      this.intervalId = setInterval(()=>{
        if(!this.stop){
          this.countDown()
        }
      }, 1000)
    }
  }

  ngOnInit(): void {
    this.initStartTime()
  }
}
