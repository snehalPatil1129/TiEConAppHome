import React from 'react';
import { View, ScrollView, TouchableOpacity, Image, Dimensions, Keyboard } from 'react-native';
import { RkButton, RkText, RkChoice, RkModalImg, RkCard, RkTextInput, RkAvoidKeyboard, RkStyleSheet, RkTabView, RkTheme } from 'react-native-ui-kitten';
import { FontAwesome } from '../../assets/icons';
import { GradientButton } from '../../components/gradientButton';
import { scale, scaleModerate, scaleVertical } from '../../utils/scale';
import { NavigationActions } from 'react-navigation';
import { Container, Content, Footer, Header, Title, Button, Icon, Tabs, Tab, Text, Right, Left, Body, TabHeading } from "native-base";
import { onSignOut } from "../../auth";
import * as Screens from '../index';
import { Contacts, Chat, ProgramsTab, ConnectTab } from  '../index';
import { TabNavigator, TabView } from 'react-navigation'

export class HomePage extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Home'.toUpperCase(),
  });

  constructor(props) {
    super(props);
    this.state = { 
      currentTab: 'Home' 
    };
  }

  render() {
    return (
      <Container>
        <Tabs tabBarPosition="bottom" style={{ elevation: 3 }}>
          <Tab
            heading={
              <TabHeading style={{ flexDirection: 'column' }}><Icon name="calendar"/><Text>Program</Text></TabHeading>
            }
          >
            <ProgramsTab navigation={this.props.navigation}/>
          </Tab>
          <Tab
            heading={
              <TabHeading style={{ flexDirection: 'column' }}><Icon name="ios-link"/><Text>Connect</Text></TabHeading>
            }
          >
            <ConnectTab navigation={this.props.navigation}/>
          </Tab>
          <Tab
            heading={
              <TabHeading style={{ flexDirection: 'column' }}><Icon name="ios-people"/><Text>Speakers</Text></TabHeading>
            }
          >
            <Contacts navigation={this.props.navigation}/>
          </Tab>
        </Tabs>
      </Container>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
}));