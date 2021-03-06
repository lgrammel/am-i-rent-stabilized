import { Component } from "./_componentBase";
import { goToNextSlide, goToSlideIdx } from "../action_creators";

export class AdvanceSlides extends Component {
  constructor(props) {
    super(props);
  }

  init(props) {
    super.checkForStore();

    if ("advanceToIdx" in props && typeof props.advanceToIdx === "number") {
      this.advanceToIdx = props.advanceToIdx;
    }

    if ("buttonSelector" in props && typeof props.buttonSelector === "string") {
      this.button = this.element.querySelector(props.buttonSelector);
    } else {
      throw new Error("Requires a CSS selector for its button");
    }

    this.handleClick = this.handleClick.bind(this);
    this.advanceToSlide = this.advanceToSlide.bind(this);
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
    event.preventDefault();
    this.advanceToSlide();
  }

  advanceToSlide() {
    if (this.advanceToIdx !== undefined) {
      this.store.dispatch(goToSlideIdx(this.advanceToIdx));
    } else {
      this.store.dispatch(goToNextSlide());
    }
  }
}
