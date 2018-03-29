import React from 'react';
import { Text, View,Icon,Tab,TabHeading,Tabs } from 'native-base';
import { StyleSheet, FlatList, TouchableOpacity, Keyboard, Alert, AsyncStorage,ScrollView } from 'react-native';
import { RkComponent, RkTheme, RkText, RkAvoidKeyboard,RkStyleSheet, RkButton, RkCard, RkTextInput } from 'react-native-ui-kitten';
import { NavigationActions } from 'react-navigation';
import { Service } from '../../../services';
import ReactMoment from 'react-moment';
import Moment from 'moment';
import { Avatar } from '../../../components';
import firebase from '../../../config/firebase';
import {RecentQuestions} from './recentQuestion';
import {TopQuestions} from './topQuestion';

const questionTable = 'AskedQuestions';
var firestoreDB = firebase.firestore();
export default class AskQuestion extends RkComponent {

    constructor(props) {
        super(props);
        this.state = {
            Question: "",
            currentUser: "",
            sessionId: this.props.sessionId,
            topQueView : false,
            recentQueView :true,
            questionData : [],
            orderBy : "timestamp"
        }
    }
    componentWillMount() {
        let thisRef = this;
        Service.getCurrentUser((userDetails) => {
            thisRef.setState({
              currentUser: userDetails.firstName + " " + userDetails.lastName
            });
          });
          this.getQuestions();
    }
    getQuestions = () => {
        let sessionId = this.state.sessionId;
        let orderByObj = this.state.orderBy;
        let thisRef = this;
        let Data = [];
        Service.getDocRef(questionTable)
        .where("SessionId" , "==" , sessionId )
        .orderBy(orderByObj,"desc")
        .get()
        .then(function(docRef){
            if(docRef.size > 0){
                docRef.forEach(doc => {
                    Data.push(doc.data());
                })
                thisRef.setState({questionData : Data})
            }
         })
         .catch(function (error){
            console.error("Error adding document: ", error);
         });
    }
    onSubmit = () => {
        let compRef = this;
        let que = this.state.Question;
        let user = this.state.currentUser;
        let sessionId = this.state.sessionId;
        if (que.length !== 0) {
            firestoreDB.collection('AskedQuestions')
            .add({
                    Question: que,
                    askedBy: user,
                    SessionId: sessionId,
                    timestamp : firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(function (docRef) {
                compRef.setState({
                    Question: ""
                })
                Alert.alert("Question submitted successfully");
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
        }
        else {
            Alert.alert("Please fill the question field...");
        }
    }
    onChangeInputText = (text) => {
        let Question = text;
        this.setState({
            Question: Question
        })
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
    onTopQueSelect = () => {
        if(this.state.topQueView == false){
            this.setState({
                topQueView : true,
                recentQueView : false,
                orderBy : "Votes"
            })
            this.getQuestions();
        }
    }
    onRecentQueSelect = () => {
        if(this.state.recentQueView == false){
            this.setState({
                topQueView : false,
                recentQueView : true,
                orderBy : "timestamp"
            })
            this.getQuestions();
        }
    }
    render() {
        return (
            <ScrollView>
                <RkAvoidKeyboard
                onStartShouldSetResponder={(e) => true}
                onResponderRelease={(e) => Keyboard.dismiss()}>
                <View style={{flexDirection :'row'}}>
                    <RkTextInput type="text"  style={{width: 300, marginRight: 10 }}placeholder="Enter your question here..." value={this.state.Question} name="Question" onChangeText={(text) => this.onChangeInputText(text)} />
                    <RkText  style={{ fontSize: 35,width: 46,height : 46 , marginLeft : 8 }} onPress={() => this.onSubmit()}><Icon name="md-send"/> </RkText>
                </View>

                <View style={{ alignItems: 'center', flexDirection: 'row', width: 380, marginBottom: 3, marginLeft: 2, marginRight: 2 }}>
                    <View style={{ width: 180 }} >
                        <RkButton rkType='outline'
                            contentStyle={{ fontSize: 18 }}
                            name="Recent"
                            style={{ fontSize: 15, flexDirection: 'row', width: 170, marginLeft: 2, marginRight: 1 }}
                            onPress={this.onRecentQueSelect}
                        >Recent Questions
                             </RkButton>     
                    </View>
                    <View style={{ width: 180 }} >
                        <RkButton rkType='outline'
                            contentStyle={{ fontSize: 18 }}
                            name="Top"
                            style={{ fontSize: 15, flexDirection: 'row', width: 170, marginLeft: 1, marginRight: 2 }}
                            onPress={this.onTopQueSelect}
                        >Top Questions </RkButton>
                    </View>
                </View>
                <View>
                    <View style={styles.section}>
                        <View style={[styles.row, styles.heading]}>
                            <RkText style={{ fontSize: 18 }} rkType='header6 primary'>Recent</RkText>
                        </View>
                    </View>
                    {this.displayQuestions()}
                </View>
                {/* <View>{
                    this.state.topQueView ? <TopQuestions /> : null
                }
                </View>
                <View>{
                    this.state.recentQueView ? <RecentQuestions sessionId = {this.state.sessionId} /> : null
                }
                </View> */}
            </RkAvoidKeyboard>
            </ScrollView>
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
