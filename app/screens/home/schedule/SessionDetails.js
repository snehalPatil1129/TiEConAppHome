import React, {Component} from 'react';
import {Text, View,TouchableOpacity, StyleSheet} from 'react-native';
import { RkButton } from 'react-native-ui-kitten';
import {NavigationActions} from 'react-navigation';
export class SessionDetails extends Component {
  static navigationOptions = {
    title: 'Session Details'.toUpperCase()
  };

  constructor(props) {
    super(props);
    console.log('props',this.props.navigation.state.params.session.key);
    this.state= {
      sessionId : this.props.navigation.state.params.session.key
    }

  }

  render() {
    return (
      <View style={styles.sessionView}>
        <Text>
            Session Details here
        </Text>
        <RkButton rkType='dark' style={{ flexDirection : 'row', width: 200 ,marginBottom : 5}}
          onPress={() => this.props.navigation.navigate('Survey', { sessionId: this.state.sessionId })}
        >Give Feedback </RkButton>
        <RkButton rkType='success' style={{ flexDirection : 'row', width: 200}}
          onPress={() => this.props.navigation.navigate('QueTab', { sessionId: this.state.sessionId })}
        >Ask Questions </RkButton>

        

      </View>
    )
  }
}

const styles = StyleSheet.create({
  sessionView: {
    flex: 1,
    flexDirection: 'column'
  }
});
