import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'clock';

  startCursorXPosition = 0;
  endCursorXPosition = 0;
  sliderCurrentPosition = 0;
  sectionIndex = 0;

  handleTouchStart(e: any) {
    this.startCursorXPosition = e.changedTouches[0].clientX;
  }

  private sliderLimited(lower: number, higher: number) {
    this.sliderCurrentPosition =
      this.sliderCurrentPosition < lower ? lower : this.sliderCurrentPosition;

    this.sliderCurrentPosition =
      this.sliderCurrentPosition > higher ? higher : this.sliderCurrentPosition;
  }

  private sliderCenterValue() {
    if (this.sliderCurrentPosition > -16.66) {
      this.sliderCurrentPosition = 0;
      this.sectionIndex = 0;
    }

    if (
      this.sliderCurrentPosition < -16.67 &&
      this.sliderCurrentPosition > -49.98
    ) {
      this.sliderCurrentPosition = -33.33;
      this.sectionIndex = 1;
    }

    if (this.sliderCurrentPosition < -49.99) {
      this.sliderCurrentPosition = -66.66;
      this.sectionIndex = 2;
    }
  }

  private moveSlider() {
    const $slider: any = document.getElementById('slider');
    $slider.style.transform = `Translate(${this.sliderCurrentPosition}%)`;
  }

  handleSectionChange(value: number) {
    this.sectionIndex = value;
    this.sliderCurrentPosition = value * -33.33;
    this.moveSlider();
  }

  handleTouchMove(e: any): any {
    let xPosition = e.changedTouches[0].clientX;
    let screenWidth: any = window.visualViewport.width;
    if (xPosition <= 0 || xPosition >= screenWidth) {
      this.handleTouchEnd();
      return;
    }
    this.endCursorXPosition = xPosition;
    let difference = this.startCursorXPosition - this.endCursorXPosition;
    let direction = difference !== 0 ? (difference < 0 ? 1 : -1) : 0;
    let percent: any = Math.abs(difference) / 8;

    let translateValue = percent * direction;
    this.sliderCurrentPosition += translateValue;

    this.sliderLimited(-66.66, 0);
    this.moveSlider();
    this.startCursorXPosition = this.endCursorXPosition;
  }

  handleTouchEnd() {
    this.sliderCenterValue();
    this.moveSlider();
  }

  initApp() {
    let index = parseInt(`${window.localStorage.getItem('sectionIndex')}`);
    this.sectionIndex = index;
    this.sliderCurrentPosition = -33.33*index
    this.moveSlider()
  }

  ngOnInit() {
    this.initApp();
  }
}
