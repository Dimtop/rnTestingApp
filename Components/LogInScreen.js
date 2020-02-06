/*This is the LogInScreen component, that provides
a form to log in.*/

import React, {Component} from 'react';
import {Text} from 'react-native';
import {Container,Button} from 'native-base';
import {Grid, Row, Col} from 'react-native-easy-grid';
import SignUpField from './SignUpField';
import firestore from '@react-native-firebase/firestore';
import styles from '../Styles/GlobalStyles';

class LogInScreen extends Component{
  constructor(props){
    super(props);

    //The state here consists of the username and the password, that
    //are used as the credentials of the user to log in. The userMessage
    //property, will hold the message returned to the user when the provided
    //credentials are wrong.
    this.state = {
      username:"",
      password:"",
      userMessage:""
    }

    //Binding the class' methods to 'this'
    this.manageLogIn = this.manageLogIn.bind(this);
    this.manageChildFieldDataChange = this.manageChildFieldDataChange.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }


  /*This is a function, called upon the press of the login button.
  Using propmises, it gets the whole Users collection from the
  database and the runs a loop through it, checking if the provided
  credentials match any record. If a match is found, the user gets 
  redirected to the main screen. Otherwise, a corresponding message
  is thrown, and the form fields are cleared. */ 
  manageLogIn(){
    const {navigate} = this.props.navigation;

    firestore().collection('Users').get()
    .then(snapshot =>{
      snapshot.forEach(doc =>{
        console.log(doc);
        if(doc._data.username == this.state.username && doc._data.password == this.state.password){
          navigate('MainScreen',{text:"George"});
        }
        this.setState({userMessage:"Wrong credentials. Please try again."});
        this.resetForm();
      });
    });
  }


  /*This is a method that is achieve two way data binding,
  helping to get the data entered into the SignUpField comonents,
  and patching the to the approptiate state property.*/
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

  //This is a method that clears the state, namely the form's fields.
  resetForm(){
    this.setState({
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
                <Text style={styles.titleTextStyle}>Log In</Text>  
            </Row>
            <SignUpField fieldName="Username"  navigation={this.props.navigation} onFieldDataChange={this.manageChildFieldDataChange} text={this.state.username}/>
            <SignUpField fieldName="Password"  navigation={this.props.navigation} onFieldDataChange={this.manageChildFieldDataChange} text={this.state.password}/>
             <Row size={20} style={styles.mainRowStyle}>
              <Text style={styles.mainTextStyle}>{this.state.userMessage}</Text>  
            </Row>
            <Row size={20}>
                <Col size={1}></Col>
                <Col size={2}>
                    <Button style={styles.mainButtonStyle}><Text style={styles.buttonTextStyle} onPress={this.manageLogIn}>Enter account</Text></Button>
                </Col>
                <Col size={1}></Col>
            </Row>
          </Grid>
        </Container>
    );
  }
}


export default LogInScreen;
