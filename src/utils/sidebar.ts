import {
  UsersIcon as UsersIconSolid,
  Squares2X2Icon,
  ChatBubbleLeftRightIcon,
  PuzzlePieceIcon,
} from '@heroicons/react/24/solid';

import { CogIcon, CpuChipIcon, UsersIcon } from '@heroicons/react/24/outline';

const sidebar = [
  {
    path: '/dashboard',
    icon: Squares2X2Icon,
    name: 'dashboard',
  },
  {
    path: '/chatbot',
    icon: CpuChipIcon,
    name: 'Chatbot',
  },
  {
    path: '/widget-config',
    icon: PuzzlePieceIcon,
    name: 'Widget Configs',
  },
  {
    path: '/feedbacks',
    icon: ChatBubbleLeftRightIcon,
    name: 'Feedbacks',
  },
  {
    path: '/users',
    icon: UsersIcon,
    name: 'Users',
  },
  {
    path: '/admins',
    icon: UsersIconSolid,
    name: 'Admins',
  },

  {
    path: '/settings',
    icon: CogIcon,
    name: 'Settings',
  },

  // {
  //   path: '/dashboard/dealer',
  //   icon: GlobeAsiaAustraliaIcon,
  //   name: 'Dealers',
  // },
];

export default sidebar;
