import { KeyboardNavigation } from "./keyboardNavigation";
// import { store } from "../store";

jest.mock("../store");

describe("KeyboardNavigation", () => {
  let keyboardNavigation;
  let store;
  let mockCurSlideIndex;

  beforeAll(() => {
    store = require("../store");
    mockCurSlideIndex = jest.spyOn(
      KeyboardNavigation.prototype,
      "curSlideIndex"
    );
    setDocumentHtml(getMainHtml()); // eslint-disable-line no-undef
    keyboardNavigation = new KeyboardNavigation({
      element: document.body,
    });
  });

  afterAll(() => {
    jest.resetModules();
  });

  test("The consumer should be able to call new() on LanguageToggle", () => {
    expect(keyboardNavigation).toBeTruthy();
  });

  test("curSlideIndex returns the current slide index", () => {
    keyboardNavigation.curSlideIndex();
    expect(store.getState).toHaveBeenCalled();
    expect(mockCurSlideIndex).toHaveReturnedWith(0);
  });

  test("maybeGoToNextSlide should dispatch GoToNextSlide action if permissible", () => {
    jest.clearAllMocks();
    keyboardNavigation.maybeGoToNextSlide();
    expect(store.dispatch).toHaveBeenCalledWith({ type: "GoToNextSlide" });
  });
});
