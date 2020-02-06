/*This is the InitialScreen component, that provides
the options to log in, or to sign up.*/

import React, {Component} from 'react';
import {Text} from 'react-native';
import {Container,Button} from 'native-base';
import {Grid, Row, Col} from 'react-native-easy-grid';
import styles from '../Styles/GlobalStyles';

class InitialScreen extends Component{
  constructor(props){
    super(props);
 
  }

  //The onPress() methods of the two buttons, use the navigate function property of the inherited navigation props,
  //to help navigating to the next screen. The same goes for the other components too.
  render(){
    
    const {navigate} = this.props.navigation;
    return(
        <Container style={styles.mainContainer}>
            <Grid>
              <Row size={1} style={styles.mainRowStyle}>
                <Text style={styles.titleTextStyle}>Welcome to the testing app!</Text> 
              </Row>
              <Row size={3}>
                <Col size={1}>
                </Col>
                <Col size={2} style={styles.mainColumnStyle}>
                  <Row size={1}>
                    <Button style={styles.mainButtonStyle} onPress={()=> navigate('LogInScreen')}><Text style={styles.buttonTextStyle}>Log in</Text></Button>
                  </Row>
                  <Row size={1}>
                    <Button style={styles.mainButtonStyle}  onPress={()=> navigate('SignUpScreen')}><Text style={styles.buttonTextStyle}>Sign up</Text></Button>
                  </Row>
                </Col>
                <Col size={1}>
                </Col>
              </Row>
             
            </Grid>
        </Container>
    );
  }
}


export default InitialScreen;
