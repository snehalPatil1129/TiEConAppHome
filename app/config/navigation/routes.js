import React from 'react';
import { ScrollView, View, StyleSheet, Alert, AsyncStorage, ActivityIndicator } from 'react-native';

import {FontIcons} from '../../assets/icons';
import * as Screens from '../../screens/index';
import { HomePage } from '../../screens/index';
import { Questions } from '../../screens/index';
import _ from 'lodash';
import {data} from '../../data';
//import firebase from '../firebase';


export class HomePageMenuScreen extends React.Component {
  static navigationOptions = {
    title: 'Home'.toUpperCase()
  };
  constructor(){
    super()
    this.user = data.getUser()
  }
  componentWillMount(){
    let thisRef =this;
    AsyncStorage.getItem("USER_DETAILS").then((userDetails)=>{
      let user = JSON.parse(userDetails)
        let userDetails1 = user
        console.log('User' ,userDetails1);
     })
     .catch(err => {
       console.warn('Errors');
     });
  }
  render() {
    return (
      <HomePage navigation={this.props.navigation} />
     )

    // return (
    //  <Questions navigation={this.props.navigation} />
    // )
  }
}

export const MainRoutes = [
  {
    id: 'HomeMenu',
    title: 'Home',
    icon: 'md-home',
    screen: HomePageMenuScreen,
    children: [
      {
        id: 'Contacts',
        title: 'Contacts',
        screen: Screens.Contacts,
        children: []
      },
      {
        id: 'Chat',
        title: 'Chat',
        screen: Screens.Chat,
        children: []
      },
      {
        id: 'ChatList',
        title: 'Chat List',
        screen: Screens.ChatList,
        children: []
      },
      {
        id: 'ProfileV1',
        title: 'User Profile V1',
        screen: Screens.ProfileV1,
        children: []
      },
      {
        id: 'AttendeeProfile',
        title: 'Profile',
        screen: Screens.AttendeeProfile,
        children: []
      },
      {
        id: 'SessionDetails',
        title: 'Session Details',
        screen: Screens.SessionDetails,
        children: []
      },
      {
        id: 'QueTab',
        title: 'Ask Questions',
        screen: Screens.QueTab,
        children: []
      },
      {
        id: 'Survey',
        title: 'Survey',
        screen: Screens.Survey,
        children: []
      }
    ]
  },
  {
    id: 'QRScanner',
    title: 'QR Scanner',
    icon: 'md-qr-scanner',
    screen: Screens.QRScanner,
    children: [],
    roleNames: ['Admin','Volunteer']
  },
  {
    id: 'MyProfile',
    title: 'My Profile',
    icon: 'ios-person',
    screen: Screens.ProfileSettings,
    children: [],
  },
  // {
  //   id: 'Dashboard',
  //   title: 'Dashboard',
  //   icon: 'ios-list',
  //   screen: Screens.Dashboard,
  //   children: []
  // },
  // {
  //   id: 'Themes',
  //   title: 'Themes',
  //   icon: FontIcons.theme,
  //   screen: Screens.Themes,
  //   children: []
  // },
];

let menuRoutes = _.cloneDeep(MainRoutes);
menuRoutes.unshift({
  id: 'GridV2',
  title: 'Start',
  screen: HomePageMenuScreen,
  children: []
},);

export const MenuRoutes = menuRoutes;