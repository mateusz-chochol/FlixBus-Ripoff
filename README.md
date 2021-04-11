# FlixBus-Ripoff
Like the name suggests it's a bus travel website that tries to imitate FlixBus

It uses firebase as a hosting service: https://flixbus-development.web.app/ (demo so far)

As of now the things that work are:
- login (as of now api keys have expired so it throws an error)
- singup (as of now api keys have expired so it throws an error)
- password reseting (it sends a message to the registered email) (as of now api keys have expired so it throws an error)
- notifications
- main page
- routing (to the pages that already exist)
- private routing (i.e. you cannot go to the login page if you are already logged in)
- transitioning to mobile view on smaller screens (i.e. drawer with tabs instead of tabs in the app bar)
- route map page

Current TODOs:
- main page:
  - <del> fix vertical scaling on mobile devices </del> (Done)
  - <del> add autocompletion for destination / departure text fields </del> (Done)
  - change background paper to something code generated so it's never to small no matter the resolution
  - <del> fix return / departure date fields so they have separate data sources and departure cannot be after return date and none can be before current date </del>  (Done)
  - <del> make search button actually do something </del> (Done)
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
  - clicking on the available trip should redirect the user to the page of that trip (also create a page of a particular trip)
  - <del> error snackbar about no such trips found should only show up after clicking the search button </del> (Won't do)
  - <del> map should load only markers of the locations that the user can actually see (depending on the zoom level) and should display only set amount of them with system that selects which ones to show and that depends on the "importance" level of the locations (every location should have some "importance" level) </del> (Done)
  - <del> map should ask for the permission to locate the user and set its center to the user location (and if user denies then the center should remain as the center of Europe) </del> (Done)
  - <del> if marker is picked it should always be visible </del> (Done)
- plan your journey page:
  - create blank page with some static info
  - think about what this page should contain
- services page:
  - create blank page with some static info
  - think about what this page should contain
- company page:
  - create blank page with some static info
- newsletter page:
  - create blank page with some static info
- send feedback page:
  - create blank page with some static info
- help page:
  - create blank page with some static info
- results page:
  - fill the results page with results
- general:
  - <del> fix scaling of the Log In / Sign Up buttons so the In / Up doesnt jump between the lines when the screen gets smaller (or if it has to jump make it so both Log In and Sign Up jump at the same time) </del> (Done)
  - move all data to the firebase backend and create api calls that will fetch them when needed
  - <del> think if user should be able to search trips if only one of departure / destination fields are filled </del> (Done)
  - <del> redo redux for locations (like it was done with trips) </del> (Done)
  - <del> redo some redux slices (the ones that are suppose to contact firebase) so they use createAsyncThunk </del> (Done)