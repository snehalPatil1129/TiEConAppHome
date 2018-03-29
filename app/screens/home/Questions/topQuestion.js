import React from 'react';
import { Text, View,Icon,Tab,TabHeading,Tabs } from 'native-base';
import { StyleSheet, FlatList, TouchableOpacity, Keyboard, Alert, AsyncStorage } from 'react-native';
import { RkComponent, RkTheme, RkText, RkAvoidKeyboard, RkButton, RkCard, RkTextInput } from 'react-native-ui-kitten';
import { NavigationActions } from 'react-navigation';
import { Service } from '../../../services';
import ReactMoment from 'react-moment';
import Moment from 'moment';
import { Avatar } from '../../../components';
import firebase from '../../../config/firebase'
let Que = [];
var firestoreDB = firebase.firestore();
export  class TopQuestions extends RkComponent {

    constructor(props) {
        super(props);
        this.state = {
            Question: "",
            askedBy: "",
            sessionId: this.props.sessionId,
            topQueView : false,
            recentQueView :true
        }
    }
    render() {
        return (
            <RkAvoidKeyboard
                onStartShouldSetResponder={(e) => true}
                onResponderRelease={(e) => Keyboard.dismiss()}>
                <View style={{flexDirection :'row'}}>
                    <Text>Top questions displayed here</Text>
                    </View>
            </RkAvoidKeyboard>
        );
    }
}
