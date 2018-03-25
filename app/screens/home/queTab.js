import React from 'react';
import { RkAvoidKeyboard, RkStyleSheet } from 'react-native-ui-kitten';
import { Tabs, Tab, Icon, Text, TabHeading } from "native-base";

import AskQuestions from './Questions/askQuestions';
import PollSession from './Questions/pollSession';

export class QueTab extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }
  

  render() {
    return (
      <Tabs style={{ elevation: 3 }}>
        <Tab
          heading={
            <TabHeading><Icon name="calendar"/><Text>Ask Questions</Text></TabHeading>
          }
        >
         <AskQuestions  navigation={this.props.navigation}/>
         
         
        </Tab>
        <Tab
          heading={
            <TabHeading><Icon name="ios-link"/><Text>Polling</Text></TabHeading>
          }
        >
          <PollSession navigation={this.props.navigation}/>
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