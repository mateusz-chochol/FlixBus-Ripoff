import Component from 'types/Objects/Component';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import ExploreRoundedIcon from '@material-ui/icons/ExploreRounded';
import DevicesRoundedIcon from '@material-ui/icons/DevicesRounded';
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';
import HelpRoundedIcon from '@material-ui/icons/HelpRounded';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import FeedbackIcon from '@material-ui/icons/Feedback';

const components: Component[] = [
  {
    icon: <DirectionsBusIcon />,
    name: 'Main page',
    done: [
      'Fix vertical scaling on mobile devices',
      'Add autocompletion for destination / departure text fields',
      'Change background paper to something code generated so it\'s never to small no matter the resolution',
      'Fix return / departure date fields so they have separate data sources and departure cannot be after return date and none can be before current date',
      'Make search button actually do something',
    ],
    todo: [
      'Fix mobile keyboard that bumps departure form nearly out of the user view',
    ],
  },
  {
    icon: <ExploreRoundedIcon />,
    name: 'Route map page',
    done: [
      'Fix autocompletion so it generates results after typing at least 2 characters',
      'Use RxJS to delay call for autocompletion data (1-2 seconds after last typed character)',
      'Disable selecting markers after typing the departure / destination (make so the search button does that)',
      'Disable immediate filtering of the trips (make so the search button does the filtering)',
      'Create new button that redirects the user to the results page if departure / destination forms are filled up (include parameters in the url)',
      'The button should at first be disabled with info that you need to fill up the forms',
      'Search button should update the available trips column',
      'Default stage of the trips column should tell the user to fill up at least one form',
      'Trips column should display some "not found" message if the user input doesnt match to anything',
      'Clicking on the available trip should redirect the user to the page of that trip (also create a page of a particular trip)',
      'Error snackbar about no such trips found should only show up after clicking the search button',
      'Map should load only markers of the locations that the user can actually see (depending on the zoom level) and should display only set amount of them with system that selects which ones to show and that depends on the "importance" level of the locations (every location should have some "importance" level)',
      'Map should ask for the permission to locate the user and set its center to the user location (and if user denies then the center should remain as the center of Europe)',
      'If marker is picked it should always be visible',
    ],
    todo: [
      'Optimize calls for locations even more with adding previous search history, previous map bounds history and calculating only necessarry area of locations to ask for (based on previous map bounds history)'
    ],
  },
  {
    icon: <DevicesRoundedIcon />,
    name: 'Service page',
    done: [
      'Create blank page with some static info',
      'Think about what this page should contain',
      'Fill the page with some static info',
    ],
    todo: [],
  },
  {
    icon: <BusinessRoundedIcon />,
    name: 'Company page',
    done: [
      'Create blank page with some static info',
      'Think about what this page should contain',
      'Fill the page with some static info',
    ],
    todo: [],
  },
  {
    icon: <LibraryBooksIcon />,
    name: 'Newsletter page',
    done: [
      'Create blank page with some static info',
      'Think about what this page should contain',
      'Fill the page with some static info',
    ],
    todo: [],
  },
  {
    icon: <FeedbackIcon />,
    name: 'Send feedback page',
    done: [
      'Create blank page with some static info',
      'Think about what this page should contain',
      'Fill the page with some static info',
    ],
    todo: [],
  },
  {
    icon: <HelpRoundedIcon />,
    name: 'Help page',
    done: [
      'Create blank page with some static info',
      'Think about what this page should contain',
      'Fill the page with some static info',
    ],
    todo: [],
  },
  {
    icon: <SearchIcon />,
    name: 'Results page',
    done: [
      'Create blank page with some static info',
      'Create basic layout for the page',
      'Fill the results page with results',
      'Add displaying return trips',
      'Add searching by using dates',
      'Add price filter',
      'Add hours filter',
      'Add seats left filter',
      'Add additional check if user has changed any of the date fields',
      'Add sorting',
      'Refactor everything and split it into multiple components at the end',
    ],
    todo: [],
  },
  {
    icon: <SettingsIcon />,
    name: 'General',
    done: [
      'Fix scaling of the Log In / Sign Up buttons so the In / Up doesnt jump between the lines when the screen gets smaller (or if it has to jump make it so both Log In and Sign Up jump at the same time)',
      'Think if user should be able to search trips if only one of departure / destination fields are filled',
      'Redo redux for locations (like it was done with trips)',
      'Redo some redux slices (the ones that are suppose to contact firebase) so they use createAsyncThunk',
      'Move components functions to proper places',
      'Change setting tab id so its done in default route component',
      'Enable PWA capabilities',
      'Create cart for desktop version',
      'Create cart for mobile version',
    ],
    todo: [
      'Move all data to the firebase backend and create api calls that will fetch them when needed',
      'Add creating ids of everything with uuid.v4()',
      'Divide props folder into multiple smaller folders',
      'Make checkout button do something',
    ],
  },
]

export default components;