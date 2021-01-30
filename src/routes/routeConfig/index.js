import { PlayArea, History } from '../../modules';
import { Default } from '../../layouts';

const publicRoutes = [
  {
    key: 'root',
    component: PlayArea,
    layout: Default,
    path: '/',
    exact: true,
  },
  {
    key: 'playArea',
    component: PlayArea,
    layout: Default,
    path: '/playArea',
    exact: true,
  },
  {
    key: 'history',
    component: History,
    layout: Default,
    path: '/history',
    exact: true,
  },
];

export default publicRoutes;
