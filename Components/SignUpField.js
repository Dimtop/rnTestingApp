import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Container,Button,Form,Item,Input,Label,Content} from 'native-base';
import {Grid, Row, Col} from 'react-native-easy-grid';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import styles from '../Styles/GlobalStyles';

class SignUpField extends Component{
  constructor(props){

    super(props);
    this.state = {
        isSensitiveField: (this.props.fieldName == 'Password')
    };
  }

  render(){
    const {navigate} = this.props.navigation;
    return(
      <Row size={20}>
          <Col size={0.5}></Col>
          <Col size={3}>
              <Form>
                  <Item fixedLabel>
                      <Label style={styles.mainTextStyle}>{this.props.fieldName}</Label>
                      <Input secureTextEntry={this.state.isSensitiveField} style={styles.mainTextStyle} onChangeText={text=> this.props.onFieldDataChange(text, this.props.fieldName)} value={this.props.text}/>
                  </Item>
              </Form>
          </Col>
          <Col size={0.5}></Col>
      </Row>
    );
  }
}

export default SignUpField;
