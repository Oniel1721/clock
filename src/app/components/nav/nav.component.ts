import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, DoCheck {

  @Input('sectionIndex') sectionIndex = 0;
  @Input('sliderPosition') sliderPosition = 0;

  @Output() changeSection = new EventEmitter<number>();


  constructor() { }

  handleClick(e:any){
    const $navChildrens:any = document.getElementById("nav")?.children
    const navChildrens = Array.from($navChildrens)
    let index = navChildrens.indexOf(e.target)
    if(index !== -1){
      this.changeSection.emit(index)
    }
  }

  changeSectionTitleColor(){
    const $navChildrens:any = document.getElementById("nav")?.children
    const navChildrens = Array.from($navChildrens)

    navChildrens.forEach((child:any, i)=>{
      if(i === this.sectionIndex){
        child.classList.add('active')
      }
      else{
        child.classList.remove('active')
      } 
    })
  }


  setSectionIndex(){
    let round = Math.round(this.sliderPosition)
    if(round%100 === 0){
      this.sectionIndex = round/100
    }
  }

  moveBlueLine(){
    const $blueLine:any = document.getElementById('blue-line');
    let translateX = Math.round(this.sliderPosition*-3)
    $blueLine.style.transform = `translateX(${translateX}%)`
  }


  ngDoCheck(){
    this.moveBlueLine()
    this.setSectionIndex()
    this.changeSectionTitleColor()
    window.localStorage.setItem('sectionIndex', `${this.sectionIndex}`)
  }

  ngOnInit(): void {
  }

}
