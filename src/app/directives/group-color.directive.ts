import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';
import { Match } from '../modules/match/store/match.model';

@Directive({
  selector: '[appGroupColor]'
})
export class GroupColorDirective implements OnChanges {
  @Input() appGroupColor!: Match[];

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(): void {
    this.updateBackgroundColor();
  }

  private updateBackgroundColor(): void {
    const completedCount = this.appGroupColor.filter(match => match.isCompleted).length;

    if (completedCount > 1) {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', 'red');
    } else if (completedCount === 1) {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', 'orange');
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'background-color');
    }
  }
}