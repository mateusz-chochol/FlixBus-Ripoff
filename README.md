# FlixBus-Ripoff
Like the name suggests it's a bus travel website that tries to imitate FlixBus

It uses firebase as a hosting service: https://flixbus-development.web.app/ (demo so far)

App is installable as a PWA (Progressive Web App) on both mobile and desktop devices. To install the app open the site from the URL above and press "Add to home screen" bar that shows up at the bottom of the screen

## Prerequisites for local deployment

- [npm](https://nodejs.org/en/download/) or [docker](https://www.docker.com/products/docker-desktop)
- .env file that contains all the firebase and Google Maps API keys with below structure:

```
  REACT_APP_FIREBASE_API_KEY=<your_firebase_api_key>
  REACT_APP_FIREBASE_AUTH_DOMAIN=<your_firebase_auth_domain>
  REACT_APP_FIREBASE_DATABASE_URL=<your_firebase_database_url>
  REACT_APP_FIREBASE_PROJECT_ID=<your_firebase_project_id>
  REACT_APP_FIREBASE_STORAGE_BUCKET=<your_firebase_storage_bucket>
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<your_firebase_messaging_sender_id>
  REACT_APP_FIREBASE_APP_ID=<your_firebase_app_id>

  REACT_APP_GOOGLE_MAPS_API_KEY=<your_googlemaps_api_key>
```

- Working firebase <b>firestore</b> and <b>authentication</b> emulators on ports respectively <b>8080</b> and <b>9099</b> or deletion of below code in <b>src/components/App.tsx</b> file

```
  auth.useEmulator("http://localhost:9099")
  firestore.useEmulator("localhost", 8080)
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
- login
- singup
- password reseting (it sends a message to the registered email)
- notifications
- routing
- private routing (i.e. you cannot go to the login page if you are already logged in)
- transitioning to mobile view on smaller screens (i.e. drawer with tabs instead of tabs in the app bar)
- main page
- route map page
- results page
- services page
- company page
- newsletter page
- help page
- checkout page
- running as mobile app (PWA)

## Current TODOs:
- main page:
  - <del> fix vertical scaling on mobile devices </del> (Done)
  - <del> add autocompletion for destination / departure text fields </del> (Done)
  - <del> change background paper to something code generated so it's never to small no matter the resolution </del> (Won't do)
  - <del> fix return / departure date fields so they have separate data sources and departure cannot be after return date and none can be before current date </del>  (Done)
  - <del> make search button actually do something </del> (Done)
  - fix mobile keyboard that bumps departure form nearly out of the user view
- route map page:
  - <del> fix autocompletion so it generates results after typing at least 2 characters </del>  (Done)
  - <del> use RxJS to delay call for autocompletion data (1-2 seconds after last typed character) </del> (Done [found easier way than with RxJS])
  - <del> disable selecting markers after typing the departure / destination (make so the search button does that) </del> (Won't do)
  - <del> disable immediate filtering of the trips (make so the search button does the filtering) </del> (Won't do)
  - <del> create new button that redirects the user to the results page if departure / destination forms are filled up (include parameters in the url) </del> (Won't do)
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
  - <del> restrict showing only trips from today </del> (Done [added date field instead])
  - <del> remove basicTrips.json collection and work only on trips.json </del> (Done)
  - <del> remove horizontal list of trips on mobile devices </del> (Done)
  - <del> add ability to add trips to cart directly from list </del> (Done)
  - <del> add loading screen </del> (Done)
- <del> plan your journey page: </del> (Won't do)
  - <del> create blank page with some static info </del> (Done)
  - <del> think about what this page should contain </del> (Won't do)
- <del> services page: </del> (Done)
  - <del> create blank page with some static info </del> (Done)
  - <del> think about what this page should contain </del> (Done)
  - <del> fill the page with some static info </del> (Done)
- <del> company page: </del> (Done)
  - <del> create blank page with some static info </del> (Done)
  - <del> think about what this page should contain </del> (Done)
  - <del> fill the page with some static info </del> (Done)
- <del> newsletter page: </del> (Done)
  - <del> create blank page with some static info </del> (Done)
  - <del> think about what this page should contain </del> (Done)
  - <del> fill the page with some static info </del> (Done)
- <del> send feedback page: </del> (Done)
  - <del> create blank page with some static info </del> (Done)
  - <del> think about what this page should contain </del> (Done)
  - <del> fill the page with some static info </del> (Done)
- <del> help page: </del> (Done)
  - <del> create blank page with some static info </del> (Done)
  - <del> think about what this page should contain </del> (Done)
  - <del> fill the page with some static info </del> (Done)
- <del> results page: </del> (Done)
  - <del> create blank page with some static info </del> (Done)
  - <del> create basic layout for the page </del> (Done)
  - <del> fill the results page with results </del> (Done)
  - <del> add displaying return trips </del> (Done)
  - <del> add searching by using dates </del> (Done)
  - <del> add price filter </del> (Done)
  - <del> add hours filter </del> (Done)
  - <del> add seats left filter </del> (Done)
  - <del> add additional check if user has changed any of the date fields </del> (Done)
  - <del> add sorting </del> (Done)
  - <del> add loading screen </del> (Done)
  - <del> refactor everything and split it into multiple components at the end </del> (Done)
- <del> trip page: </del> (Won't do [decided that creating a page for one trip makes little sense])
  - <del> create blank page with some trip info </del> (Done)
  - <del> create basic layout for the page </del> (Done)
  - <del> think about what this page should contain </del> (Done)
- <del> checkout page: </del> (Done)
  - <del> create forms for people </del> (Done)
  - <del> create forms for contact </del> (Done)
  - <del> create forms for payment </del> (Done)
  - <del> create trip summary </del> (Done)
  - <del> add forms validation </del> (Done)
- <del> profile page: </del> (Done)
  - <del> create layout </del> (Done)
  - <del> create forms </del> (Done)
  - <del> create transactions history </del> (Done)
  - <del> make Update button actually updating the profile in firebase </del> (Done)
- <del> your trips page: </del> (Done)
  - <del> create layout </del> (Done)
  - <del> create trips history lists </del> (Done)
- admin panel:
  - create layout for the page
  - add form for adding locations
  - add form for adding trips
  - add button to update trips dates
  - add option of adding random trip
- general:
  - <del> fix scaling of the Log In / Sign Up buttons so the In / Up doesnt jump between the lines when the screen gets smaller (or if it has to jump make it so both Log In and Sign Up jump at the same time) </del> (Done)
  - <del> move all data to the firebase backend and create api calls that will fetch them when needed </del> (Done)
  - <del> think if user should be able to search trips if only one of departure / destination fields are filled </del> (Done)
  - <del> redo redux for locations (like it was done with trips) </del> (Done)
  - <del> redo some redux slices (the ones that are suppose to contact firebase) so they use createAsyncThunk </del> (Done)
  - <del> move components functions to proper places </del> (Done)
  - <del> change setting tab id so its done in default route component </del> (Done)
  - <del> add creating ids of everything with uuid.v4() </del> (Won't do)
  - <del> enable PWA capabilities </del> (Done)
  - <del> divide props folder into multiple smaller folders </del> (Done)
  - <del> create cart for desktop version </del> (Done)
  - <del> create cart for mobile version </del> (Done [reused desktop version])
  - <del> make checkout button do something </del> (Done)
  - <del> add counting number of passengers in the cart </del> (Done)
  - <del> add persistence to cart items (so they don't vanish after refreshing the page) </del> (Done)
  - <del> add loading screen to cart </del> (Done)
  - <del> add loading screen to text forms </del> (Done)
  - <del> add some timeouts before displaying loading screens </del> (Done)
  - make buying trips actually create a transaction object with all info about the transaction (who's going, where and such)
  - add passenger info to transactions