import React from 'react';
import { Text, View,Icon,Tab,TabHeading,Tabs } from 'native-base';
import {Container, StyleSheet, FlatList, TouchableOpacity, Keyboard, Alert, AsyncStorage,ScrollView } from 'react-native';
import { RkComponent, RkTheme, RkText,RkStyleSheet, RkAvoidKeyboard, RkButton, RkCard, RkTextInput } from 'react-native-ui-kitten';
import { NavigationActions } from 'react-navigation';
import { Service } from '../../../services';
import ReactMoment from 'react-moment';
import Moment from 'moment';
import { Avatar } from '../../../components';

const questionTable = 'AskedQuestions';

export  class RecentQuestions extends RkComponent {
    constructor(props) {
        super(props);
        this.state = {
            sessionId: this.props.sessionId,
            message : "",
            questionData : []
        }
    }
    componentWillMount(){
        let sessionId = this.state.sessionId;
        let thisRef = this;
        let Data = [];
        Service.getDocRef(questionTable)
        .where("SessionId" , "==" , sessionId )
        .get()
        .then(function(docRef){
            if(docRef.size > 0){
                docRef.forEach(doc => {
                    Data.push(doc.data());
                })
                thisRef.setState({questionData : Data})
            }
         });
    }
    displayQuestions = () =>{
        let questionList = this.state.questionData.map(question =>{
            let askedDate = Moment(question.timestamp).format("DD MMM,YYYY");
            let askedTime = Moment(question.timestamp).format("hh:mm A");
            return(
                <View >
                    <RkCard style={{ marginLeft: 5, marginRight: 5, height: 125 }}>
                        <View style={{ flexDirection: 'row', marginLeft: 3, marginTop :5 }}>
                            <View style={{marginVertical :25}}>
                                <Text style={{fontStyle: 'italic',fontSize: 12}}>{question.askedBy}</Text>
                                <View>{this.getDateTime(question.timestamp)}</View>
                            </View>
                            <View style={{width : 200, flex: 1,flexDirection: 'column',justifyContent: 'center',marginLeft:5}}>
                                <Text style={{fontSize: 14 }} >{question.Question}</Text>
                            </View>
                            <View style={{ marginRight: 5 ,marginVertical :25}} >
                                <Text><Icon name="md-thumbs-up" /></Text>
                            </View>
                        </View>
                    </RkCard>
                </View>
            )
        })
        return questionList;
    }

    getDateTime = (queDateTime) => {
        let queDate = Moment(queDateTime).format("DD MMM,YYYY");
        let queTime = Moment(queDateTime).format("hh:mm A");
        return (
            <View>
            <Text style={{fontSize: 10 }}>{queDate}</Text>
            <Text style={{fontSize: 10 }}>{queTime}</Text>
            </View>
        );
    }
    render() {
        return (
           
            <View>
                <View style={styles.section}>
                    <View style={[styles.row, styles.heading]}>
                        <RkText style={{ fontSize: 18 }} rkType='header6 primary'>Recent Questions</RkText>
                    </View>
                </View>
                    {this.displayQuestions()}
            </View>
          
            
        );
    }
}
let styles = RkStyleSheet.create(theme => ({
    root: {
      backgroundColor: theme.colors.screen.base
    },
    section: {
      marginVertical: 10,
      marginBottom : 10
    },
    descSection : {
      marginVertical: 25,
      marginBottom : 10,
      marginTop : 5
    },
    subSection: {
      marginTop : 5,
      marginBottom :10
    },
    row: {
      flexDirection: 'row',
      paddingHorizontal: 17.5,
      borderColor: theme.colors.border.base,
      alignItems: 'center'
    },
    text :{
      marginBottom : 5,
      fontSize : 15,
      marginLeft: 20
    },
    surveButton :{
      alignItems: 'baseline',
      flexDirection: 'row',
      width: 380,
      marginTop: 8, 
      marginBottom: 3,
      marginLeft: 5,
      marginRight: 5 
    }
  }));