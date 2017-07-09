import React from 'react';
import { StackNavigator } from 'react-navigation';
import LoginPage from '././src/pages/login/Login';
import DashBoard from './src/pages/dashboard/Dashboard'
import Profile from './src/pages/dashboard/Profile'
import Repository from './src/pages/dashboard/Repository'

const App = StackNavigator({
  Login: { screen: LoginPage },
  DashBoard: { screen: DashBoard },
  Profile: { screen: Profile },
  Repository: { screen: Repository }
}, {
    initialRouteName: 'Login',
  });
console.disableYellowBox = true;
export default App;