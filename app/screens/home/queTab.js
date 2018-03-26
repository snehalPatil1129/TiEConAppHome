import React from 'react';
import { RkAvoidKeyboard, RkStyleSheet } from 'react-native-ui-kitten';
import { Tabs, Tab, Icon, Text, TabHeading } from "native-base";
import { AsyncStorage } from "react-native";

import AskQuestions from './Questions/askQuestions';
// import Survey from './Questions/Survey';
import PollSession from './Questions/PollSession';
export  class QueTab extends React.Component {
  static navigationOptions = {
    title: 'Ask Questions'.toUpperCase()
  };
  constructor(props) {
    super(props);
    this.state ={
      sessionId : this.props.navigation.state.params.sessionId,
      //UserName : ''
    }
  }

  // componentWillMount(){
  //   let thisRef =this;
  //   AsyncStorage.getItem("USER_DETAILS").then((userDetails)=>{
  //     let user = JSON.parse(userDetails)
  //     let Name = user.firstName + " " + user.lastName;
  //       thisRef.setState({
  //           UserName : Name
  //       })
  //    })
  //    .catch(err => {
  //      console.warn('Errors');
  //    });
  // }
  

  render() {
    return (
      <Tabs style={{ elevation: 3 }}>
        <Tab
          heading={
            <TabHeading><Icon name="question"/><Text>Ask Questions</Text></TabHeading>
          }
        >
         <AskQuestions  navigation={this.props.navigation} sessionId = {this.state.sessionId}  />
         
         
        </Tab>
        <Tab
          heading={
            <TabHeading><Icon name="ios-stats"/><Text>Poll Session </Text></TabHeading>
          }
        >
          <PollSession navigation={this.props.navigation} sessionId = {this.state.sessionId}  UserName = {this.state.UserName}/>
        </Tab>
      </Tabs>
    );
  }
}

let styles = RkStyleSheet.create(theme => ({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.screen.base
  },
}));