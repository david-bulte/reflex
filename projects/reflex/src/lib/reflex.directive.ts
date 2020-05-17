import { AfterViewInit, Directive, ElementRef, Host, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[reflex]'
})
export class ReflexDirective implements AfterViewInit, OnChanges {

  // e.g. 2-3-1-0000 gives children flex values of 2, 3 and 1 respectively, and creates an 'empty' div with flex-value 4
  @Input('reflex') expr = '';

  constructor(@Host() private ref: ElementRef, private renderer: Renderer2) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['expr'];
    if (change && !change.isFirstChange()) {
      const el: HTMLElement = this.ref.nativeElement;
      this.applyExpr(el);
    }
  }

  ngAfterViewInit(): void {
    const el: HTMLElement = this.ref.nativeElement;
    this.renderer.setStyle(el, 'display', 'flex');

    this.applyExpr(el);
  }

  private applyExpr(el) {
    const flexValues = this.expr.split('-');

    const containsSpaces = this.expr.indexOf('0') > -1;
    if (containsSpaces) {
      this.createDivsForSpaces(el, flexValues);
    }

    this.applyFlexValues(el, flexValues);
  }

  private createDivsForSpaces(el, flexValues) {
    const children = Array.from(el.children);
    const newChildren = [];

    let i = 0;
    for (const flexValue of flexValues) {
      if (flexValue.startsWith('0')) {
        newChildren.push(this.renderer.createElement('div'));
      } else {
        let child = children[i];
        this.renderer.removeChild(el, child);
        newChildren.push(child);
        i++;
      }
    }

    for (const child of newChildren) {
      this.renderer.appendChild(el, child);
    }
  }

  private applyFlexValues(el, flexValues) {
    const children = Array.from(el.children);
    for (let i = 0; i < flexValues.length; i++) {
      const flexValue = flexValues[i];
      const child = children[i];
      if (!flexValue.startsWith('0')) {
        this.renderer.setStyle(child, 'flex', flexValue);
      } else {
        this.renderer.setStyle(child, 'flex', flexValue.length);
      }
    }
  }
}
