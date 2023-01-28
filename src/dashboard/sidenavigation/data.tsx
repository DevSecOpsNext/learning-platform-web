import HomeIcon from './icons/home';
import MessageIcon from './icons/message';
import SettingsIcon from './icons/settings';
import DocumentationIcon from './icons/documentation';
import StackpathIcon from './icons/Stackpath';

const data = [
  {
    title: 'Dashboard',
    icon: <HomeIcon />,
    link: '/',
  },
  {
    title: 'Stack Paths',
    icon: <StackpathIcon />,
    link: '/user/stackpath',
  },
  {
    title: 'Messages',
    icon: <MessageIcon />,
    link: '/user/messages',
  },
  {
    title: 'Settings',
    icon: <SettingsIcon />,
    link: '/user/settings',
  },
  {
    title: 'Documentation',
    icon: <DocumentationIcon />,
    link: '/user/documentation',
  },
];

export default data;
