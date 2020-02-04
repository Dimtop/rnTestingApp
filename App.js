import React, {Component} from 'react';
import InitialScreen from './Components/InitialScreen';
import SignUpScreen from './Components/SignUpScreen';
import LogInScreen from './Components/LogInScreen';
import MainScreen from './Components/MainScreen';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Content } from 'native-base';



class App extends Component{

  constructor(props){
    super(props);
  }


  render(){
    
    const MainNavigator = createStackNavigator(
      {
        InitialScreen: {
          screen: InitialScreen,
          navigationOptions:{
            headerShown:false
          }
        },
        SignUpScreen:{
          screen: SignUpScreen,
          navigationOptions:{
            headerShown:false
          }
        },
        LogInScreen:{
          screen: LogInScreen,
          navigationOptions:{
            headerShown:false
          }
        },
        MainScreen:{
          screen: MainScreen,
          navigationOptions:{
            headerShown:false
          }
        }
      },
      {
        initialRouteName: 'InitialScreen'
      });
    const AppRoutingComponent =  createAppContainer(MainNavigator);
    return(
        <AppRoutingComponent/>
    );
  }
}

export default App;
