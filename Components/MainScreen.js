import React, {Component} from 'react';
import {Container} from 'native-base';
import {Text,Image} from 'react-native';
import {Grid, Row, Col} from 'react-native-easy-grid';
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
                <Text style={styles.titleTextStyle}>Reacct rocks!</Text>  
            </Row>
            <Row size={60} style={styles.mainRowStyle}>
                <Col size={4}>
                    <Image style={styles.mainImageStyle}></Image> 
                </Col>
            </Row>
            <Row size={20} style={styles.mainRowStyle}></Row>
          </Grid>
        </Container>
    );
  }
}

export default MainScreen;
