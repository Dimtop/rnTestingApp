import React, {Component} from 'react';
import {StyleSheet,Text} from 'react-native';
import {Container,Button, Content} from 'native-base';
import {Grid, Row, Col} from 'react-native-easy-grid';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import styles from '../Styles/GlobalStyles';

class InitialScreen extends Component{
  constructor(props){
    super(props);
 
  }
  render(){
    
    const {navigate} = this.props.navigation;
    return(
        <Container style={styles.mainContainer}>
            <Grid>
              <Row size={1} style={styles.mainRowStyle}>
                <Text style={styles.titleTextStyle}>Welcome to the testing app!</Text>
              </Row>
              <Row size={2}>
                <Col size={1}>
                </Col>
                <Col size={2} style={styles.mainColumnStyle}>
                  <Row size={1}>
                    <Button style={styles.mainButtonStyle} onPress={()=> navigate('LogInScreen')}><Text style={styles.mainTextStyle}>Log in</Text></Button>
                  </Row>
                  <Row size={2}  style={styles.mainRowStyle}>
                    <Text style={styles.titleTextStyle}>Or</Text>
                  </Row>
                  <Row size={1}>
                    <Button style={styles.mainButtonStyle}  onPress={()=> navigate('SignUpScreen')}><Text style={styles.mainTextStyle}>Create new account</Text></Button>
                  </Row>
                </Col>
                <Col size={1}>
                </Col>
              </Row>
              <Row size={1}>

              </Row>
            </Grid>
        </Container>
    );
  }
}


export default InitialScreen;
