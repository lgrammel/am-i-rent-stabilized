# Am I Rent Stabilized Changelog
This changelog describes major changes to the website and application. It was first created on November 25, 2020.

## 2020-11-29 (PR #58)
This was a major JavaScript refactor (perhaps more so a rewrite!) of the application's codebase that amounted to over 400 commits! The primary goal of this refactor was to make the JavaScript code easier to reason about as its previous implementation was, let's say, not the easiest to reason about. Secondary goals were to improve code quality with unit tests, Continuous Integration, JS & SCSS linting, and code formatting. I also removed some 3rd party libraries that were no longer needed, upgraded ones that were kept, and implemented a new build system using Webpack.

Non-goals of this refactor included:  
- porting the codebase to a JavaScript framework such as React or Vue 
- porting the codebase to Typescript 
- refactoring the styles (SCSS/Sass)
- fixing accessibility issues
- adding new features (well except for autosuggest in the address search!)

However, when an a11y related fix or SCSS improvement could be made with little effort I did so. I plan on fixing the major a11y issues with the website following this refactor.

The following is a comprehensive overview of the changes that were made.

### Code Refactor
- [x] refactor JavaScript in previous `app/js/app` directory
- [x] restructure the sub-directories in `app/`, e.g. use the `src/` and `public` directory conventions that are commonly used with modern frontend web apps.
- [x] modularize the code using ES modules 
- [x] use ES6+ features / syntax
- [x] isolate interactive UI elements as ES6 Class components that inherit from a super class.
- [x] utilize immutable application state management

#### Components
Create Component classes for each interactive element to isolate its logic, styles, and DOM element(s).
- [x] Component super class
- [x] AddToCalendar
- [x] AddressSearchForm
- [x] AdvanceSlides
- [x] KeyboardNavigation
- [x] LanguageToggle
- [x] LanguageToggleButton
- [x] MapTileLayers
- [x] MapPopup
- [x] Navigation
- [x] ProgressIndicator
- [x] RentHistoryEmail
- [x] SearchResultMap
- [x] SearchValidationErrors
- [x] slidesContainer
- [x] StartOver
- [x] VerifyRentStabilized  

#### State Management
- [x] use Redux.JS for managing application state
- [x] use Redux Dev Tools for tracking state when in dev mode
- [x] use `redux-logger` in a "debug" mode for debugging builds when necessary
- [x] use `redux-thunk` for handling async actions
- [x] use custom middlewares for logging errors and crashes
- [x] use an `observeStore` function that allows for Components to react to state changes

### Frontend Build System Eval
- [x] evaluated the previous frontend build system that used Gulp.JS and found it to be difficult to modify and improve so scrapped it.
- [x] use Webpack as a frontend build system with support for "develop" and "production" build options
- [x] use Webpack Dev Server
- [x] use Babel.JS for transpiling ES6+ code to ES5 for IE11
- [x] create separate entry points (code split) for `index.html` and `info/*.html` pages

### Code Quality Improvement
- [x] set up an ESLint task
- [x] set up StyleLint task for CSS/SCSS
- [x] set up a Prettier code formatting task
- [x] set up the Jest testing framework 
- [x] set up a `git` commit hook that runs Prettier and ESLint
- [x] write unit tests
- [x] setup Github Action for building the app and running tests in pull requests
- [x] setup lightweight error/exception logging using Google Analytics `gtag.js`

### Static Assets
- [x] Split up locales JSON files (previously all three supported languages were in one file per HTML page)
- [x] Rename `app/data/` directory to `app/public/locales/`
- [x] use `[page-name]-[lang-code].json` file naming convention for locale files
- [x] updated translation buisness logic to accommodate this new convention

### 3rd Party Deps
- [x] upgrade GSAP dependency
- [x] remove packages installed in `bower_components` (think this is just `cartodb.js`?)
- [x] remove `jQuery`
- [x] remove `cartodb.js`
- [x] remove `aja.js`
- [x] kept `addthis.js` (social media sharing widget)
- [x] upgrade `atc.js` (Add to Calendar)
- [x] upgrade `handlebars.js`
- [x] upgrade `analytics.js` to `gtag.js`

### Geographic Map
- [x] remove usage of Leaflet.JS / CartoDB.JS
- [x] use `d3-tile` and `d3-geo` for lightweight map implementation
- [x] use CARTO Maps API for querying likely rent stabilized map tiles
- [x] kept CARTO Positron basemap tiles

### Use NYC Planning Labs Geocoder for Address Search
The previous address geocoding API being used required the street address and borough name to be passed as separate params which required separate inputs in the UI. The newer Geocoding API supports autosuggest which provides a better User Experience.
- [documentation](https://labs-geosearch-docs.netlify.app/)
- [x] remove borough select / dropdown
- [x] use autosuggest API endpoint and show results via an HTML `datalist`
- [x] update form validations error messages & styling
- [x] update translation text for form input & error validations
- [x] fix handling of form submit
- [x] made the form's "search" button an actual form submit button
- [x] add HTML label for form's text/search input

### Other
- [x] use Netlify for Preview Deploys, builds, and other misc checks on pull requests
- [x] use Netlify to host the website and automatically deploy it when pushing to the `master` git branch
- [x] removed the "Rent Logic" button / link from last slide (Rent Logic is a startup and they haven't donated a dime to me so why feature it for free on the website's homepage?)

### Left Overs
The following items I did not get around to completing and intend to address after Pull Request #58 has been merged (you can only fit so much in a single PR!)

- [ ] JS resize handler for setting slide size
  - when the browser is resized, the layout shifts oddly. A resize event handler would fix this.
  - or perhaps dispatching the `goToSlideIdx` action with the current slide index?

- [ ] Tenants Rights search component
  - needs a modal component (could combine with rent-history modal?)
  - needs the tenants rights spatial search query
  - needs an SQL query for CARTO
  - needs async action for fetching data
  - could move hbs template from index.html page to a file

A11Y: 

- [ ] manage focus when scrolling between slides (see [this write up for why](https://css-tricks.com/smooth-scrolling-accessibility/))

- [ ] Fix tab index so that the user can't jump between slides by tabbing
  - maybe set tabIndex="-1" on all focusable elements that aren't in the current slide?
  - look into using the [`inert` html property](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert) ([video demo](https://www.youtube.com/watch?v=fGLp_gfMMGU&list=PL7Bjl0Cb4SboBHNihVBRd-AdctfXcmClc&index=3&t=0s&app=desktop)) (requires a [polyfill](https://github.com/WICG/inert) for some browsers)

- [ ] make buttons actual HTML buttons and not clickable `<div>` elements

Misc:

- [ ] add a 404 page and adjust translation business logic for it
- [ ] could upgrade or remove normalize.css as it mostly isn't needed these days