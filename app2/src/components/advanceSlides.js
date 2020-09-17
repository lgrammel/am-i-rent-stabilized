import { Component } from "./_componentBase";
import { nextSlide, store } from "../store";

export class AdvanceSlides extends Component {
  constructor(props) {
    super(props);
  }

  init() {
    this.button = this.element.querySelector("h3"); // TODO: make this an actual button
    this.bindEvents = this.bindEvents.bind(this);
    this.bindEvents();
  }

  bindEvents() {
    this.button.addEventListener("click", this.handleClick);
  }

  removeEvents() {
    this.button.removeEventListener("click", this.handleClick);
  }

  handleClick(event) {
    const { slides } = store.getState();
    if (slides.canAdvance) {
      store.dispatch(nextSlide());
    }
  }
}
