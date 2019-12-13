import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import Login from 'pages/Login'; 
import Tabs from "./MainTabNavigator";    

const Routes = createAppContainer(
  createSwitchNavigator({
    Login,
    Tabs
  })
);

export default Routes;