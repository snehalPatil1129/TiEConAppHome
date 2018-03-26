import React from 'react';
import { RkAvoidKeyboard, RkStyleSheet } from 'react-native-ui-kitten';
import { Tabs, Tab, Icon, Text, TabHeading } from "native-base";

import AskQuestions from './Questions/askQuestions';
import Survey from './Questions/Survey';

export  class Feedback extends React.Component {
  static navigationOptions = {
    title: 'Feedback'.toUpperCase()
  };
  constructor(props) {
    super(props);
    console.log("SessionID", this.props.navigation.state.params.sessionId);
    this.state ={
      sessionId : this.props.navigation.state.params.sessionId
    }
  }

  componentDidMount() {
  }
  

  render() {
    return (

        <View>
            <Text>FeedBack Giving!!!!</Text>
            </View>
   
    );
  }
}

let styles = RkStyleSheet.create(theme => ({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.screen.base
  },
}));
 //   <Tabs style={{ elevation: 3 }}>
    //     <Tab
    //       heading={
    //         <TabHeading><Icon name="question"/><Text>FeedBack</Text></TabHeading>
    //       }
    //     >
    //     <Text>Hello feedback</Text>
    //     </Tab>
    //   </Tabs>