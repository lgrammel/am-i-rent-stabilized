import fs from "fs";
import path from "path";
import H from "handlebars";
import { LanguageToggle } from "./languageToggle";
import { LanguageToggleButton } from "./languageToggleButton";
import { LANGS, IN_LANG } from "../utils/constants";

const localeData = require("../../public/locales/main-content.json");

const translate = require("../utils/translate");
jest.mock("../utils/translate", () => {
  return {
    __esModule: true,
    translatePage: jest.fn(),
    getCurLang: jest.fn(() => "en"),
    setCurLang: jest.fn(),
  };
});

describe("LanguageToggle", () => {
  let languageToggle;
  let spyEs;
  let spyZh;

  beforeAll(async () => {
    const hbsFile = fs.readFileSync(
      path.resolve(__dirname, "../hbs_templates/main.hbs"),
      "utf8"
    );
    const template = H.compile(hbsFile);
    const html = template(localeData.languages.en);
    document.body.innerHTML = `<div id="wrapper">${html}</div>`;

    languageToggle = new LanguageToggle({
      element: document.querySelector("div.desktop .lang-toggle"),
    });
    spyEs = jest.spyOn(languageToggle.es, "toggle");
    spyZh = jest.spyOn(languageToggle.zh, "toggle");
  });

  afterAll(() => {
    jest.resetModules();
  });

  test("The component's HTML exists", () => {
    expect(document.querySelector(".lang-toggle")).toBeDefined();
  });

  test("The consumer should be able to call new() on LanguageToggle", () => {
    expect(languageToggle).toBeTruthy();
  });

  test("The component instance's element property exists", () => {
    expect(languageToggle.element).toBeDefined();
  });

  test("The component's buttons correctly handle a click event", () => {
    document.querySelector("div.desktop .lang-toggle a[lang='es']").click();
    expect(translate.translatePage).toHaveBeenCalled();
    expect(translate.setCurLang).toHaveBeenCalledWith("es");

    document.querySelector("div.desktop .lang-toggle a[lang='zh']").click();
    expect(translate.translatePage).toHaveBeenCalled();
    expect(translate.setCurLang).toHaveBeenCalledWith("zh");
  });

  test("The method getLangFromBtn returns the correct language code", () => {
    expect(languageToggle.getLangFromBtn(IN_LANG.EN)).toBe(LANGS.EN);
    expect(languageToggle.getLangFromBtn(IN_LANG.ES)).toBe(LANGS.ES);
    expect(languageToggle.getLangFromBtn(IN_LANG.ZH)).toBe(LANGS.ZH);
  });

  test("The method setLanguageToggleBtnsText toggles the correct language", () => {
    translate.getCurLang
      .mockImplementationOnce(() => "es")
      .mockImplementationOnce(() => "zh");

    const mockEs = (languageToggle.es.toggle = jest.fn());
    const mockZh = (languageToggle.zh.toggle = jest.fn());

    languageToggle.setLanguageToggleBtnsText();
    expect(mockEs).toHaveBeenCalledTimes(1);

    languageToggle.setLanguageToggleBtnsText();
    expect(mockZh).toHaveBeenCalledTimes(1);
  });
});

describe("LanguageToggleButton", () => {
  let es;

  beforeAll(() => {
    document.body.innerHTML =
      "<a class='toggle-es' lang='es' href='#'>en español</a>";
    es = new LanguageToggleButton({
      lang: "es",
      label: "en español",
      element: document.querySelector("a.toggle-es"),
    });
  });

  afterAll(() => {
    jest.resetModules();
  });

  test("The consumer should be able to call new() on LanguageToggleButton", () => {
    expect(es).toBeTruthy();
  });

  test("It should have the correct className property", () => {
    expect(document.querySelector("a.toggle-es")).toBeDefined();
  });

  test("The toggle method updates the element correctly", () => {
    es.toggle();
    expect(document.querySelector("a.toggle-en").innerHTML).toEqual(
      "in english"
    );
    expect(document.querySelector("a[lang='en']")).toBeDefined();

    es.toggle();
    expect(document.querySelector("a.toggle-es").innerHTML).toEqual(
      "en español"
    );
    expect(document.querySelector("a[lang='es']")).toBeDefined();
  });
});
