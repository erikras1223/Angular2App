import {Component} from '@angular/core';

@Component({
  selector: 'stop-watch',
  template: `
  <div class="elapsedTime">{{formattedElapsedTime}}</div>
  <div class="controls">
    <div (click)="start()">Start</div>
    <div (click)="pause()">Pause</div>
    <div (click)="reset()">Reset</div>
  </div>
  `,
  styles: [`
    .elapsedTime {
      font-size: large;
      text-align: center;
    }
    .controls {
      display: flex;
      justify-content: center;
      text-decoration: underline;
    }
    
    .controls div {
      text-align: center;
      width: 60px;
      cursor: pointer;
    }
  `]
})
export class StopwatchComponent {
  elapsedTime: number = 0;
  private prevTime: number;
  private running: boolean = false;
  
  get formattedElapsedTime(): string {
    let elapsedSeconds = (this.elapsedTime / 1000).toFixed(3);
    return elapsedSeconds + 's';
  }
  
  start() {
    if (this.running) {
      return;
    }
    this.prevTime = Date.now();
    this.running = true;
    let step = () => {
      if (this.running) {
        this.updateTimesOnTick();
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step)
  }
  
  pause() {
    if (this.running) {
      this.updateTimesOnTick();
      this.running = false;  
    }
  }
  
  reset() {
    this.running = false;
    this.elapsedTime = 0;
  }
  
  private updateTimesOnTick() {
    let currTime = Date.now();
    this.elapsedTime += currTime - this.prevTime;
    this.prevTime = currTime;
  }
}