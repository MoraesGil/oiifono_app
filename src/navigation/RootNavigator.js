import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import Login from 'pages/Login'; 
import Tabs from "./MainTabNavigator";    

const Routes = createAppContainer(
  createSwitchNavigator({
    Tabs,
    Login
  })
);

export default Routes;