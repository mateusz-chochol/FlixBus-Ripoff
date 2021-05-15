import { routes } from 'routes';
import ExploreRoundedIcon from '@material-ui/icons/ExploreRounded';
import DevicesRoundedIcon from '@material-ui/icons/DevicesRounded';
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';
import HelpRoundedIcon from '@material-ui/icons/HelpRounded';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import FeedbackIcon from '@material-ui/icons/Feedback';
import AppBarMenuItem from 'types/Objects/AppBarMenuItem';

const menuItems: AppBarMenuItem[] = [
  {
    index: 0,
    key: 'Route Map',
    text: 'Route Map',
    icon: <ExploreRoundedIcon />,
    route: routes.routeMapPage,
  },
  {
    index: 1,
    key: 'Services',
    text: 'Services',
    icon: <DevicesRoundedIcon />,
    route: routes.servicesPage,
  },
  {
    index: 2,
    key: 'Company',
    text: 'Company',
    icon: <BusinessRoundedIcon />,
    route: routes.companyPage,
  },
  {
    index: 3,
    key: 'Newsletter',
    text: 'Newsletter',
    icon: <LibraryBooksIcon />,
    route: routes.newsletterPage,
  },
  {
    index: 4,
    key: 'Send Feedback',
    text: 'Send Feedback',
    icon: <FeedbackIcon />,
    route: routes.sendFeedbackPage,
  },
  {
    index: 5,
    key: 'Help',
    text: 'Help',
    icon: <HelpRoundedIcon />,
    route: routes.helpPage,
  },
]

export default menuItems;