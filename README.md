# FlixBus-Ripoff
Like the name suggests it's a bus travel website that tries to imitate FlixBus

It uses firebase as a hosting service: https://flixbus-development.web.app/ (demo so far)

App is installable as a PWA (Progressive Web App) on mobile devices. To install the app open the site from the URL above and press "Add to home screen" bar that shows up at the bottom of the screen

## Prerequisites

- [npm](https://nodejs.org/en/download/) or [docker](https://www.docker.com/products/docker-desktop)
- .env file that contains all the firebase and Google Maps API keys with below structure:

```
  REACT_APP_FIREBASE_API_KEY=<your_firebase_api_key>
  REACT_APP_FIREBASE_AUTH_DOMAIN=<your_firebase_auth_domain>
  REACT_APP_FIREBASE_DATABASE_URL=<your_firebase_database>
  REACT_APP_FIREBASE_PROJECT_ID=<your_firebase_project_id>
  REACT_APP_FIREBASE_STORAGE_BUCKET=<your_firebase_storage_bucket>
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<your_firebase_messaging_sender>
  REACT_APP_FIREBASE_APP_ID=<your_firebase_app_id>

  REACT_APP_GOOGLE_MAPS_API_KEY=<your_googlemaps_api_key>
```

## To run locally, do:

```
  git clone https://github.com/mateusz-chochol/FlixBus-Ripoff.git
  cd flixbus-ripoff
  npm install
  npm install -g serve
  npm run build
  serve -s build
```

or

```
  git clone https://github.com/mateusz-chochol/FlixBus-Ripoff.git
  cd flixbus-ripoff
  docker-compose up
```

Site should be visible under the address: http://localhost:5000

## As of now the things that work are:
- login (as of now api keys have expired so it throws an error)
- singup (as of now api keys have expired so it throws an error)
- password reseting (it sends a message to the registered email) (as of now api keys have expired so it throws an error)
- notifications
- main page
- routing
- private routing (i.e. you cannot go to the login page if you are already logged in)
- transitioning to mobile view on smaller screens (i.e. drawer with tabs instead of tabs in the app bar)
- route map page
- running as mobile app

## Current TODOs:
- main page:
  - <del> fix vertical scaling on mobile devices </del> (Done)
  - <del> add autocompletion for destination / departure text fields </del> (Done)
  - <del> change background paper to something code generated so it's never to small no matter the resolution </del> (kinda Won't do [code for gradient commented out])
  - <del> fix return / departure date fields so they have separate data sources and departure cannot be after return date and none can be before current date </del>  (Done)
  - <del> make search button actually do something </del> (Done)
  - fix mobile keyboard that bumps departure form nearly out of the user view
- route map page:
  - <del> fix autocompletion so it generates results after typing at least 2 characters </del>  (Done)
  - <del> use RxJS to delay call for autocompletion data (1-2 seconds after last typed character) </del> (Done [found easier way than with RxJS])
  - <del> disable selecting markers after typing the departure / destination (make so the search button does that) </del> (Won't do)
  - <del> disable immediate filtering of the trips (make so the search button does the filtering) </del> (Won't do)
  - <del> create new button that redirects the user to the results page if departure / destination forms are filled up (include parameters in the url)</del> (Won't do)
    - <del> the button should at first be disabled with info that you need to fill up the forms </del> (Won't do)
  - <del> search button should update the available trips column </del> (Won't do)
  - <del> default stage of the trips column should tell the user to fill up at least one form </del> (Done)
  - <del> trips column should display some "not found" message if the user input doesnt match to anything </del> (Done)
  - <del> clicking on the available trip should redirect the user to the page of that trip (also create a page of a particular trip) </del> (Done)
  - <del> error snackbar about no such trips found should only show up after clicking the search button </del> (Won't do)
  - <del> map should load only markers of the locations that the user can actually see (depending on the zoom level) and should display only set amount of them with system that selects which ones to show and that depends on the "importance" level of the locations (every location should have some "importance" level) </del> (Done)
  - <del> map should ask for the permission to locate the user and set its center to the user location (and if user denies then the center should remain as the center of Europe) </del> (Done)
  - <del> if marker is picked it should always be visible </del> (Done)
  - optimize calls for locations even more with adding previous search history, previous map bounds history and calculating only necessarry area of locations to ask for (based on previous map bounds history)
- plan your journey page:
  - <del> create blank page with some static info </del> (Done)
  - think about what this page should contain
- services page:
  - <del> create blank page with some static info </del> (Done)
  - think about what this page should contain
- company page:
  - <del> create blank page with some static info </del> (Done)
  - think about what this page should contain
- newsletter page:
  - <del> create blank page with some static info </del> (Done)
  - think about what this page should contain
- send feedback page:
  - <del> create blank page with some static info </del> (Done)
  - think about what this page should contain
- help page:
  - <del> create blank page with some static info </del> (Done)
  - think about what this page should contain
- results page:
  - <del> create blank page with some static info </del> (Done)
  - <del> create basic layout for the page </del> (Done)
  - fill the results page with results
- trip page:
  - <del> create blank page with some trip info </del> (Done)
  - think about what this page should contain
- general:
  - <del> fix scaling of the Log In / Sign Up buttons so the In / Up doesnt jump between the lines when the screen gets smaller (or if it has to jump make it so both Log In and Sign Up jump at the same time) </del> (Done)
  - move all data to the firebase backend and create api calls that will fetch them when needed
  - <del> think if user should be able to search trips if only one of departure / destination fields are filled </del> (Done)
  - <del> redo redux for locations (like it was done with trips) </del> (Done)
  - <del> redo some redux slices (the ones that are suppose to contact firebase) so they use createAsyncThunk </del> (Done)
  - <del> move components functions to proper places </del>
  - <del> change setting tab id so its done in default route component </del>
  - add creating ids of everything with uuid.v4()
  - <del> enable PWA capabilities </del>
