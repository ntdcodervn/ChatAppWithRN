import WelcomeScreen from './../welcome'
import ChatScreen from './../ChatScreen'

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
const AppNavigator = createStackNavigator({
    Home: {
      screen: WelcomeScreen,
    },
    Chat : {
        screen : ChatScreen
    }
    
  },{
      initialRouteName : 'Chat'
  });
  
  export default createAppContainer(AppNavigator);
  