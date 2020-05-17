import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

const interval = 4000;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(1000)),
    ])
  ]
})
export class AppComponent implements OnInit {

  started = false;
  reflexValues;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.generateDivs();
  }

  start(): void {
    setTimeout(() => {
      this.play();
    });

    this.started = true;
  }

  private generateDivs() {
    const values = [];
    for (let i = 0; i < 30; i++) {
      values.push({value: randomReflexValue()})
    }
    this.reflexValues = values;
  }

  private play() {
    this.ping();
    setTimeout(() => {
      this.refreshReflexValues();
      this.cdr.markForCheck();
      setTimeout(() => this.play(), interval / 2)
    }, interval / 2)
  }

  private ping() {
    // credits: https://gist.github.com/srikumarks/5779926
    var audioContext = new AudioContext();
    var kFreq = 660, kDecayTime = 0.5, kStartTime = 1.5, kGain = 0.25;
    var oscNode = audioContext.createOscillator();
    oscNode.frequency.value = kFreq;
    var gainNode = audioContext.createGain();
    gainNode.gain.value = kGain;
    gainNode.gain.setTargetAtTime(0.0, audioContext.currentTime, kDecayTime);
    oscNode.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscNode.start(audioContext.currentTime + kStartTime); // Start a little into the future.
    oscNode.stop(audioContext.currentTime + kStartTime + 12 * kDecayTime); // Stop when the sound decays by enough.
  }

  private refreshReflexValues() {
    this.reflexValues.forEach(reflexValue => {
      reflexValue.value = randomReflexValue();
    })
  }
}

const randomReflexValue = () => {
  return `${randomNumber()}-${randomNumber()}-${randomNumber()}`;
}

const randomNumber = () => {
  return Math.floor((Math.random() * 4) + 1)
}
