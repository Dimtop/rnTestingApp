import React, {Component} from 'react';
import {StyleSheet,Text, Image} from 'react-native';
import {Container,Button, Content} from 'native-base';
import {Grid, Row, Col} from 'react-native-easy-grid';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import logo from '../Resources/logo.png';
import styles from '../Styles/GlobalStyles';

class MainScreen extends Component{
  constructor(props){
    super(props);
  }


  render(){
    const {navigate} = this.props.navigation;
    return(
        <Container style={styles.mainContainer}>
          <Grid>
            <Row size={20} style={styles.mainRowStyle}>
                <Text style={styles.titleTextStyle}>Hubear rocks \m/</Text>  
            </Row>
            <Row size={60} style={styles.mainRowStyle}>
                <Col size={4}>
                    <Image style={styles.mainImageStyle} source={logo}></Image> 
                </Col>
            </Row>
            <Row size={20} style={styles.mainRowStyle}></Row>
          </Grid>
        </Container>
    );
  }
}

export default MainScreen;
