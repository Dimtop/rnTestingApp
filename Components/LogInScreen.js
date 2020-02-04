import React, {Component} from 'react';
import {StyleSheet,Text} from 'react-native';
import {Container,Button} from 'native-base';
import {Grid, Row, Col} from 'react-native-easy-grid';
import SignUpField from './SignUpField';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import firestore from '@react-native-firebase/firestore';
import styles from '../Styles/GlobalStyles';

class LogInScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
      username:"",
      password:""
    }

    this.manageLogIn = this.manageLogIn.bind(this);
    this.manageChildFieldDataChange = this.manageChildFieldDataChange.bind(this);
  }


  manageLogIn(){
    const {navigate} = this.props.navigation;

    firestore().collection('Users').get()
    .then(snapshot =>{
      snapshot.forEach(doc =>{
        console.log(doc);
        if(doc._data.username == this.state.username && doc._data.password == this.state.password){
          navigate('MainScreen');
        }
        console.log("No user found.");
      });
    });
  }


  manageChildFieldDataChange(data,fieldName){
    switch(fieldName){
      case "Username":
        this.setState({username:data});
        break;
      case "Password":
        this.setState({password:data});
        break;
    }
  }

  render(){
    const {navigate} = this.props.navigation;
    return(
        <Container style={styles.mainContainer}>
          <Grid>
            <Row size={20} style={styles.mainRowStyle}>
                <Text style={styles.titleTextStyle}>Log In</Text>  
            </Row>
            <SignUpField fieldName="Username"  navigation={this.props.navigation} onFieldDataChange={this.manageChildFieldDataChange}/>
            <SignUpField fieldName="Password"  navigation={this.props.navigation} onFieldDataChange={this.manageChildFieldDataChange}/>
            <Row size={20}>
                <Col size={1}></Col>
                <Col size={2}>
                    <Button style={styles.mainButtonStyle}><Text style={styles.mainTextStyle} onPress={this.manageLogIn}>Enter account</Text></Button>
                </Col>
                <Col size={1}></Col>
            </Row>
          </Grid>
        </Container>
    );
  }
}


export default LogInScreen;
