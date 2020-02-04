import React, {Component} from 'react';
import {StyleSheet,Text} from 'react-native';
import {Container,Button} from 'native-base';
import {Grid, Row, Col} from 'react-native-easy-grid';
import SignUpField from './SignUpField';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import firestore from '@react-native-firebase/firestore';
import CryptoJS from 'react-native-crypto-js';
import styles from '../Styles/GlobalStyles';

class SignUpScreen extends Component{
  constructor(props){
    super(props);

    this.state = {
      fullname:"",
      username:"",
      password:"",
      userAlreadyExists:false,
      userMessage:""
    }

    this.manageSignUp = this.manageSignUp.bind(this);
    this.manageChildFieldDataChange = this.manageChildFieldDataChange.bind(this);
    this. manageAlreadyExistingUser = this.manageAlreadyExistingUser.bind(this);
    this.areAllFieldsFilled = this.areAllFieldsFilled.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  manageSignUp(){
    const {navigate} = this.props.navigation;

    this. manageAlreadyExistingUser()
      .then( () => {
        if(!this.areAllFieldsFilled()){
          this.setState({userMessage:"Please fill all fields."});
        }
        else if(this.state.userAlreadyExists){
          this.setState({userMessage:"This username is already taken. Please try a new one."});
          this.resetForm();
        }
        else{
          firestore().collection('Users').add({
            fullname:this.state.fullname,
            username:this.state.username,
            password: CryptoJS.AES.encrypt(this.state.password, "thisisatestngkey")
          })
          .then( () =>{
            navigate('MainScreen');
          });
        }
       
      });
    }
  

  manageAlreadyExistingUser(){
    return firestore().collection('Users').get()
    .then(snapshot =>{
      snapshot.forEach(doc =>{
        if(doc._data.username == this.state.username){
          console.log(doc._data.username + "    " + this.state.username);
          this.setState({userAlreadyExists:true});
        }
      });
    });
  }

  manageChildFieldDataChange(data,fieldName){
    switch(fieldName){
      case "Fullname":
        this.setState({fullname:data});
        break;
      case "Username":
        this.setState({username:data});
        break;
      case "Password":
        this.setState({password:data});
        break;
    }
  }

  areAllFieldsFilled(){
    return (this.state.fullname == "" || this.state.username == "" || this.state.password == "");
  }

  resetForm(){
    this.setState({
      fullname:"",
      username:"",
      password:"",
      userAlreadyExists:false
    });
  }

  render(){
      
    const {navigate} = this.props.navigation;
    return(
        <Container style={styles.mainContainer}>
          <Grid>
            <Row size={20} style={styles.mainRowStyle}>
                <Text style={styles.titleTextStyle}>Sign Up</Text>  
            </Row>
            <SignUpField fieldName="Fullname" navigation={this.props.navigation} onFieldDataChange={this.manageChildFieldDataChange} text={this.state.fullname}/>
            <SignUpField fieldName="Username"  navigation={this.props.navigation} onFieldDataChange={this.manageChildFieldDataChange} text={this.state.username}/>
            <SignUpField fieldName="Password"  navigation={this.props.navigation} onFieldDataChange={this.manageChildFieldDataChange} text={this.state.password}/>
            <Row size={10} style={styles.mainRowStyle}>
              <Text style={styles.mainTextStyle}>{this.state.userMessage}</Text>  
            </Row>
            <Row size={10}>
                <Col size={1}></Col>
                <Col size={2}>
                    <Button style={styles.mainButtonStyle}><Text style={styles.mainTextStyle} onPress={this.manageSignUp}>Create new account</Text></Button>
                </Col>
                <Col size={1}></Col>
            </Row>
          </Grid>
        </Container>
    );
  }
}

export default SignUpScreen;
