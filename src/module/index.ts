import {
  makeAutoObservable,
  reaction,
} from "https://cdnjs.cloudflare.com/ajax/libs/mobx/6.6.1/mobx.esm.development.js";

export class GifSlider {
  name: string;
  value: number;
  min: number;
  max: number;
  el: HTMLInputElement;
  onchange: ((value: number, pre: number) => void) | undefined;
  constructor(
    name: string,
    value: number,
    min: number,
    max: number,
    el: HTMLInputElement,
    onchange?: (value: number, pre: number) => void
  ) {
    this.name = name;
    this.value = value;
    this.min = min;
    this.max = max;
    this.el = el;
    this.onchange = onchange;
    this.handlValueChange(0, 0);
    makeAutoObservable(this);
    reaction(
      () => this.value,
      (arg, pre) => this.handlValueChange(arg, pre)
    );
    this.el.setAttribute("min", this.min + "");
    this.el.setAttribute("max", this.max + "");
    this.el.setAttribute("step", "1");

    this.el.addEventListener("input", () => {
      this.setValue(parseInt(this.el.value));
    });
  }
  setValue(value: number) {
    this.value = value;
  }
  handlValueChange(v: number, p: number) {
    this.el.value = v + "";
    if (this.onchange) {
      this.onchange(v, p);
    }
  }
}
