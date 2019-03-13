import { Component, OnInit, OnChanges, Input } from '@angular/core';

export enum AnimationDirection {
  Upward = 1,
  Downward,
  Leftward,
  Rightward,
}

@Component({
  selector: 'moving-line',
  template: `
    <div class="moving-line" [style.height]="height" [style.width]="width">
      <div class="moving-line__outer-container">
        <div class="moving-line__inner-container"
          [style.height]="boxHeight"
          [style.width]="boxWidth"
          [style.background]="background"
          [style.boxShadow]="boxShadow"
          [style.color]="color"
          [style.top]="top"
          [style.bottom]="bottom"
          [style.left]="left"
          [style.right]="right"
          [style.transitionTimingFunction]="timingFunc"
          [style.transitionDuration]="duration">
          <div class="embedded-content"
            [innerHTML]="content"
            [style.opacity]="contentOpacity"
            [style.transform]="contentTransform"></div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `.moving-line__outer-container {
      position: relative;
      height: 100%;
      width: 100%;
    }`,
    `.moving-line__inner-container {
      position: absolute;
      height: 0;
      width: 0;
      overflow: hidden;
      transition-property: height, width;
    }`,
    `.embedded-content {
      transition-property: transform, opacity;
      transition-duration: 1.0s;
    }`,
  ]
})
export class MovingLineComponent implements OnInit, OnChanges {

  @Input()
  show: boolean = false;

  @Input()
  content: string = "";

  @Input()
  height: string = '450px';

  @Input()
  width: string = '600px';

  @Input()
  background: string = 'rgba(172, 218, 253, 1.0)';

  @Input()
  color: string = 'rgba(0, 0, 0, 1.0)';

  @Input()
  boxShadow: string = '0 1px 3px 0 rgba(32, 32, 32, .6)';

  @Input()
  lineWidth: string = '2px';

  @Input()
  durations: number[] = [1.0, 1.0]; // sec

  @Input()
  directions: AnimationDirection[] = [AnimationDirection.Downward, AnimationDirection.Rightward];

  @Input()
  transitionFuncs: string [] = ['easeInOutQuart', 'easeInOutQuart'];

  top: string = 'auto';
  bottom: string = 'auto';
  left: string = 'auto';
  right: string = 'auto';

  boxHeight: string = '2px';
  boxWidth: string = '2px';
  duration: string = '0.0s';
  timingFunc: string = 'easeInOutQuart';
  contentOpacity: number = 0.0;
  contentTransform: string = 'translateY(-8px)';

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.preprocess(this.directions);

    if (this.show) {
      this.startAnimation();
    }
  }

  startAnimation() {
    this.boxHeight = this.lineWidth;
    this.boxWidth = this.lineWidth;
    this.playAnimation(this.directions[0], this.durations[0], this.transitionFuncs[0]);
    setTimeout(() => {
      this.playAnimation(this.directions[1], this.durations[1], this.transitionFuncs[1]);
      setTimeout(() => {
        this.contentOpacity = 1.0;
        this.contentTransform = 'translateY(0px)';

      }, 1000 * this.durations[1]);
    }, 1000 * this.durations[0]);
  }

  private preprocess(directions: AnimationDirection[]) {
    for (let d of directions) {
      switch (d) {
        case AnimationDirection.Upward:
          this.bottom = '0px';
          break;
        case AnimationDirection.Downward:
          this.top = '0px';
          break;
        case AnimationDirection.Leftward:
          this.right = '0px';
          break;
        case AnimationDirection.Rightward:
          this.left = '0px';
          break;
      }
    }
  }

  private playAnimation(direction: AnimationDirection, duration: number, transition: string) {
    this.duration = duration + 's';
    this.timingFunc = transition;

    switch (direction) {
      case AnimationDirection.Upward:
        this.playAnimationUpward();
        break;
      case AnimationDirection.Downward:
        this.playAnimationDownward();
        break;
      case AnimationDirection.Leftward:
        this.playAnimationLeftward();
        break;
      case AnimationDirection.Rightward:
        this.playAnimationRightward();
        break;
    }
  }

  private playAnimationUpward() {
    this.bottom = '0px';
    this.boxHeight = this.height;
  }

  private playAnimationDownward() {
    this.top = '0px';
    this.boxHeight = this.height;
  }

  private playAnimationLeftward() {
    this.right = '0px';
    this.boxWidth = this.width;
  }

  private playAnimationRightward() {
    this.left = '0px';
    this.boxWidth = this.width;
  }

}
