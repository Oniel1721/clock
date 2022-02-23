import { Component, OnInit } from '@angular/core';
import HeaderOption from 'src/app/intefaces/header.options';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  options:HeaderOption[] = [
    {
      name: 'light mode',
      action: ()=>{this.changeLightMode()},
      iconUrl: '../../../assets/sun.png'
    }
  ]

  setLightMode(){
    let lastIndex =  this.options.length-1
    this.options[lastIndex].name = 'light mode'
    this.options[lastIndex].iconUrl = '../../../assets/sun.png'
    document.body.classList.remove('dark-mode')
    window.localStorage.setItem('light-mode', 'light')
  }

  setDarkMode(){
    let lastIndex =  this.options.length-1
    this.options[lastIndex].name = 'dark mode'
    this.options[lastIndex].iconUrl = '../../../assets/moon.png'
    document.body.classList.add('dark-mode')
    window.localStorage.setItem('light-mode', 'dark')
  }

  changeLightMode(){
    if(window.localStorage.getItem('light-mode')?.includes('light')){
      this.setDarkMode()
    }
    else{
      this.setLightMode()
    }
  }

  initLightMode(){
    let value = window.localStorage.getItem('light-mode')
    if(value === 'dark'){
      this.setDarkMode()
    }
    else{
      this.setLightMode()
    }
  }

  constructor() { }

  ngOnInit(): void {
    this.initLightMode()
  }

}
