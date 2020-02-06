/*This is the SignUpScreen component, that provides
a form to create a new account.*/

import React, {Component} from 'react';
import {Text} from 'react-native';
import {Container,Button} from 'native-base';
import {Grid, Row, Col} from 'react-native-easy-grid';
import SignUpField from './SignUpField';
import firestore from '@react-native-firebase/firestore';
import styles from '../Styles/GlobalStyles';

class SignUpScreen extends Component{
  constructor(props){
    super(props);

    //The state, consists of the necessary fields to create an
    //account (fullname, username and password. Could be more, 
    //but these were choosen due to simplicity).The userAlreadyExists
    //property, indicates whether a user is already registered to the 
    //database. The userMessage property is used to pass messages to 
    //the user.
    this.state = {
      fullname:"",
      username:"",
      password:"",
      userAlreadyExists:false,
      userMessage:""
    }

    //Binding the class' methods to 'this'
    this.manageSignUp = this.manageSignUp.bind(this);
    this.manageChildFieldDataChange = this.manageChildFieldDataChange.bind(this);
    this. manageAlreadyExistingUser = this.manageAlreadyExistingUser.bind(this);
    this.areAllFieldsFilled = this.areAllFieldsFilled.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }


  /*This is a method that manages the sign up process. It uses the
  manageAlreadyExistingUser method to pass the appropriate value to the 
  state, according to whether a user is already registered. Then, 
  if any field is empty, a message is thrown to the user. When all 
  the fields have been filled, the existence of the user is checked.
  If the given username has been previously used for another account,
  an appropriate message is thrown and the form is reseted. If not, a new 
  account is created and the user is redirected to the main screen.*/
  manageSignUp(){
    const {navigate} = this.props.navigation;

    this. manageAlreadyExistingUser()
      .then( () => {
        if(!this.areAllFieldsFilled()){
          this.setState({userMessage:"Please fill all the fields."});
        }
        else if(this.state.userAlreadyExists){
          this.setState({userMessage:"This username is already taken. Please try a new one."});
          this.resetForm();
        }
        else{
          firestore().collection('Users').add({
            fullname:this.state.fullname,
            username:this.state.username,
            password: this.state.password
          })
          .then( () =>{
            navigate('MainScreen');
          });
        }
       
      });
    }
  
  /*This method passes a value to the state, that indicates if the username
  entered, has been previously used. It gets the whole Users collection 
  and checks each document.*/
  manageAlreadyExistingUser(){
    return firestore().collection('Users').get()
    .then(snapshot =>{
      snapshot.forEach(doc =>{
        if(doc._data.username == this.state.username){
          this.setState({userAlreadyExists:true});
        }
      });
    });
  }

  
  /*This is a method that is achieve two way data binding,
  helping to get the data entered into the SignUpField comonents,
  and patching the to the approptiate state property.*/
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

  //This method returns a boolean value, that tells if there are any empty fields.
  areAllFieldsFilled(){
    return !(this.state.fullname == "" || this.state.username == "" || this.state.password == "");
  }

  //This is a method that clears the state, namely the form's fields.
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
                    <Button style={styles.mainButtonStyle}><Text style={styles.buttonTextStyle} onPress={this.manageSignUp}>Create new account</Text></Button>
                </Col>
                <Col size={1}></Col>
            </Row>
          </Grid>
        </Container>
    );
  }
}

export default SignUpScreen;
