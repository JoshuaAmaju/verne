import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import GlobeIcon from '../../assets/icons/globe.svg';
import HomeIconFill from '../../assets/icons/home.fill.svg';
import HomeIcon from '../../assets/icons/home.svg';
import LibraryIconFill from '../../assets/icons/library.fill.svg';
import LibraryIcon from '../../assets/icons/library.svg';
import PersonIconFill from '../../assets/icons/person.fill.svg';
import PersonIcon from '../../assets/icons/person.svg';
import SearchIcon from '../../assets/icons/search.svg';

import WriteIconFill from '../../assets/icons/write.fill.svg';
import WriteIcon from '../../assets/icons/write.svg';

import colors from '../../theme/colors';

import Account from './account';
import Community from './community';
import Explore from './explore';
import Home from './home';
import Library from './library';
import Write from './write';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let Icon = focused ? HomeIconFill : HomeIcon;

          switch (route.name) {
            case 'Home':
              Icon = focused ? HomeIconFill : HomeIcon;
              break;
            case 'Explore':
              Icon = SearchIcon;
              break;
            case 'Library':
              Icon = focused ? LibraryIconFill : LibraryIcon;
              break;
            case 'Community':
              Icon = GlobeIcon;
              break;
            case 'Account':
              Icon = focused ? PersonIconFill : PersonIcon;
              break;

            case 'Write':
              Icon = focused ? WriteIconFill : WriteIcon;
              break;

            // default:
            //   Icon = focused ? HomeIconFill : HomeIcon;
            //   break;
          }

          // You can return any component that you like here!
          return <Icon width={size} height={size} color={color} />;
        },
        headerShown: false,
        tabBarInactiveTintColor: '#B8B8B8',
        tabBarActiveTintColor: colors.primary,
        tabBarStyle: {
          elevation: 0,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Besley-Regular',
        },
      })}>
      <Tab.Screen name="Home" component={Home} />

      <Tab.Screen name="Explore" component={Explore} />

      <Tab.Screen
        name="Library"
        component={Library}
        options={{headerShown: true}}
      />

      <Tab.Screen name="Community" component={Community} />

      <Tab.Screen name="Account" component={Account} />

      <Tab.Screen name="Write" component={Write} />
    </Tab.Navigator>
  );
}
