import { store, observeStore } from "./store";

const spyGetState = jest.spyOn(store, "getState");
const spySubscribe = jest.spyOn(store, "subscribe");

describe("observeStore", () => {
  let select;
  let handleChange;
  let unsubscribe;

  beforeEach(() => {
    select = jest.fn((state) => state.addressGeocode);
    handleChange = jest.fn();
    unsubscribe = observeStore(store, select, handleChange);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetModules();
  });

  test("responds correctly when first invoked", () => {
    expect(spyGetState).toHaveBeenCalledTimes(1);
    expect(spySubscribe).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(select).toHaveBeenCalledTimes(1);
    expect(select).toHaveReturnedWith({
      autosuggestions: null,
      searchResult: null,
      status: "idle",
      error: null,
    });
  });

  test("responds correctly when store.dispatch() is called", () => {
    handleChange.mockClear();
    select.mockClear();
    select.mockImplementationOnce((state) => state.slides);

    store.dispatch({ type: "GoToNextSlide" });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(select).toHaveBeenCalledTimes(1);
    expect(select).toHaveReturnedWith({
      curIndex: 1,
    });
  });

  test("does not respond to store.dispatch() when unsubscribe is called", () => {
    select.mockClear();
    handleChange.mockClear();

    unsubscribe();
    store.dispatch({ type: "GoToNextSlide" });

    expect(select).not.toHaveBeenCalled();
    expect(handleChange).not.toHaveBeenCalled();
  });
});
